import { OrdersService } from '@bluebits/orders';
import { Component, OnInit } from '@angular/core';
import { ORDER_STATUS } from "@bluebits/orders";
import { OrderItem } from '../../../../../orders/src';

@Component({
  selector: 'users-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orderList: any = [];
  orderStatus = ORDER_STATUS;
  showFlag:boolean=false;
 orderItems:OrderItem[];
  constructor(private orderServ: OrdersService) {
    this.getOrdersByUserId();
  }

  ngOnInit(): void {
  }

  getOrdersByUserId() {
    let userId = localStorage.getItem('userId');
    if (userId != null) {
      this.orderServ.getOrderByUserId(userId).subscribe((response) => {
        this.orderList = response;
        console.log("orderList: ", response);

      })
    }
  }
  showOrder(orderId,orderItems){
    this.orderItems=orderItems;
    this.showFlag=!this.showFlag;
    console.log({orderItems})
  }
}
