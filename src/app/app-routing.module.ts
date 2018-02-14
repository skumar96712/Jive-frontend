import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/home/home.component';
import { HomeAuthResolver } from 'app/home/home-auth-resolver.service';
import { AuthComponent } from 'app/auth/auth.component';
import { NoAuthGuard } from 'app/auth/no-auth-guard.service';
import { AuthGuard } from 'app/shared';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { isAuthenticated: HomeAuthResolver } },
  { path: 'login', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },
  { path: 'register', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },
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
