import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // getting login user info to show on dashboard page
    this.user = this.userService.getCurrentUser();
  }

}
