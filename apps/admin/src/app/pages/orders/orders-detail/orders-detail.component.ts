import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { IConfirmOrderRequest, LicensesService, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: any;
  orderStatuses = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private licensesService: LicensesService,
    private orderService: OrdersService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onStatusChange(event) {
    if (!this.hasEnoughLicensesForDelivery() && event.value === "3") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product has no enough license codes for delivery!' });
      this.getNeededLicensesForEachProductMessage();
    } else {
      this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
            const requestBody = this.prepareRequestBody(this.order, event.value);
            this.updateProducts(requestBody);
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not updated!'
            });
          }
        );
    }
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrder(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }

  private prepareRequestBody(order: any, orderStatus: string): IConfirmOrderRequest {
    const productIds: string[] = [];
    let soldKeys: string[] = [];
    for (const orderItem of order.orderItems) {
      productIds.push(orderItem.product.id);
      const soldKey = orderItem.product.availableLicence.slice(0, orderItem.quantity);
      soldKeys = soldKeys.concat(soldKey);
    }
    return { productIds, soldKeys, orderStatus };
  }

  private updateProducts(requestBody: IConfirmOrderRequest): void {
    this.productsService.updateProducts(requestBody).pipe(takeUntil(this.endsubs$)).subscribe((messageObj) => {
      if (messageObj.success) {
        const request = { soldKeys: requestBody.soldKeys, orderStatus: requestBody.orderStatus };
        this.updateLicenses(request);
      }
    });
  }

  private updateLicenses(request: IConfirmOrderRequest): void {
    this.licensesService.updateLicenses(request).pipe(takeUntil(this.endsubs$)).subscribe((licenses) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is updated!' });
    }, (error) => this.messageService.add({ severity: 'failed', summary: 'Failed', detail: 'Order isnot updated!' }));
  }

  private hasEnoughLicensesForDelivery(): boolean {
    return !this.getOrderItemsWithMissingLicenses().length;
  }

  private getNeededLicensesForEachProductMessage(): void {
    let message: string = '';
    const orderItems = this.getOrderItemsWithMissingLicenses();
    for (const orderItem of orderItems) {
      const diff = orderItem.quantity - orderItem.product.licenceStock;
      message += `At least ${diff} licenses are needed for product ${orderItem.product.name}\n`;
    }
    this.messageService.add({ severity: 'failed', summary: 'Failed', detail: message });
  }

  private getOrderItemsWithMissingLicenses(): any[] {
    const filteredOrderItems: any[] = this.order.orderItems.filter((orderItem) => orderItem.product.licenceStock < orderItem.quantity);
    return filteredOrderItems;
  }
}
