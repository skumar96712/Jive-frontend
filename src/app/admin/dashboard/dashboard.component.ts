import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

}
