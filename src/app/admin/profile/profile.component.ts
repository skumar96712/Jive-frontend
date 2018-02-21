import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User, Errors } from '../../shared';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  user: User;
  userForm: FormGroup;
  isSubmitting = false;
  errors: Errors = new Errors();
  message: string = '';
  apiUrl = environment.api_url;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email])],
      username: ['', [Validators.required]],
      phone: [''],
      address: [''],
      picture: ['']
    });
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  updateUser() {
    this.errors = new Errors();
    this.isSubmitting = true;
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.userService.uploadImage(formData)
        .subscribe(
          data => {
            this.fileInput.nativeElement.value = '';
            const image = data.imageDetails;
            this.userForm.patchValue({
              picture: image.url,
            });
            this.updateProfile();
          },
          err => {
            this.isSubmitting = false;
            this.errors = err;
          }
        );
    }
    else {
      this.updateProfile();
    }
  }

  updateProfile() {
    const updatedUser = this.userForm.value;
    this.userService
      .update(updatedUser, this.user._id)
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.message = 'Profile updated';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
}
