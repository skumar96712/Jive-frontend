import { Component, OnInit } from '@angular/core';
import { UserService, User,Errors } from '../../shared';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;
  message: string = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  token: string = null;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // getting login user info to show on dashboard page
    this.user = this.userService.getCurrentUser();
  }
  
  openCheckout() {
    this.isSubmitting = true;
    this.errors = new Errors();       // removing error message
    var amount = 8000;
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_key,   // client account
      locale: 'auto',
      token: token => {
        this.makePayment(token,amount);
        this.token = token;
      }
    });
    handler.open({
      name: 'Jive',
      description: 'Pay to Jive',
      amount: amount,
      email: this.user.email,
      closed: closed => { 
        if(!this.token)
        {
        this.isSubmitting = false 
        }
      } 
    });
  }

  makePayment(token: any,amount:any)
  {
    this.userService.makePayment(token,amount,this.user._id)
    .subscribe(
      data => {
        this.user=data.user,
        this.message = data.message;
        setTimeout(() => {
          this.message = '';
        }, 5000)     
      },
      err => {
        this.isSubmitting = false;
        this.errors = err;  
      }
    );
  }
}
