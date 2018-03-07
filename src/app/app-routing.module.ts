import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/home/home.component';
import { HomeAuthResolver } from 'app/home/home-auth-resolver.service';
import { AuthComponent } from 'app/auth/auth.component';
import { NoAuthGuard } from 'app/auth/no-auth-guard.service';
import { AuthGuard } from 'app/shared';
import { DashboardComponent, ProfileComponent } from './admin';

// routing for all the urls and defining which pages will load for anonymous and others for authorized
const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { isAuthenticated: HomeAuthResolver } },   // home page path: app/home/home.component.html
  { path: 'login', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },                  // login page path: app/auth/auth.component.html
  { path: 'register', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },               // register page path: app/auth/auth.component.html
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },           // dashboard page path: app/admin/dashboard/dashboard.component.html
  { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },               // profile page path: app/admin/profile/profile.component.html
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
