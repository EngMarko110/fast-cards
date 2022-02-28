import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderItem, OrdersService } from '../../../../../../orders/src';

@Component({
  selector: 'users-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
orderId;
orderItems:OrderItem[];
endsubs$: Subject<any> = new Subject();

constructor(
  private orderService: OrdersService,
  private route: ActivatedRoute,
) {}

ngOnInit(): void {
  this._getOrder();
}

ngOnDestroy() {
  this.endsubs$.next();
  this.endsubs$.complete();
}


private _getOrder() {
  this.route.paramMap.subscribe((params) => {
      this.orderService
        .getOrder(params.get('orderId'))
        .pipe(takeUntil(this.endsubs$))
        .subscribe((order) => {
          this.orderItems = order.orderItems;
        });
  });
}

}




