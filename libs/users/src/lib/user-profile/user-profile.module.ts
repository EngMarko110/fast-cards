import { CoreModule } from './../../../../../apps/ngshop/src/app/shared/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserCartsComponent } from './user-carts/user-carts.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserCartsComponent,
    UserOrdersComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    CoreModule
  ]
})
export class UserProfileModule { }
