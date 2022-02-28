import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCartsComponent } from './user-carts/user-carts.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { OrderItemsComponent } from './user-orders/order-items/order-items.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent,
    children: [
      { path: 'profile', component: UserInfoComponent },
      {
        path: 'orders', component: UserOrdersComponent,
        children:[
          {path:'items/:orderId',component:OrderItemsComponent}
        ]
      },
      { path: 'carts', component: UserCartsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
