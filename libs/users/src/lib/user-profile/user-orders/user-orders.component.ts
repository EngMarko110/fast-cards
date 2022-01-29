import { OrdersService } from '@bluebits/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orderList: any = [];
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
}
