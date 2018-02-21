import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent, ProfileComponent } from '.';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],

  providers: [
    
  ]
})
export class AdminModule {}
