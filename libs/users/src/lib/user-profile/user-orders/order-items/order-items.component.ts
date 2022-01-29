import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from '../../../../../../orders/src';

@Component({
  selector: 'users-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
@Input() orderItems:OrderItem[]
  constructor() { }

  ngOnInit(): void {
  }

}
