import { CoreModule } from './../../../../../apps/ngshop/src/app/shared/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserCartsComponent } from './user-carts/user-carts.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './user-carts/order-summary/order-summary.component';
import { OrderItemsComponent } from './user-orders/order-items/order-items.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from "primeng/tag";
import { FieldsetModule } from "primeng/fieldset";
import { CardModule } from "primeng/card";


@NgModule({
  declarations: [
    UserInfoComponent,
    UserCartsComponent,
    UserOrdersComponent,
    UserProfileComponent,
    OrderSummaryComponent,
    OrderItemsComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    TagModule,
    FieldsetModule,
  ]

})
export class UserProfileModule { }
