import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartItemDetailed, CartService, OrdersService } from '../../../../../orders/src';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'users-user-carts',
  templateUrl: './user-carts.component.html',
  styleUrls: ['./user-carts.component.css']
})
export class UserCartsComponent implements OnInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  
  constructor(private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }
  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }
}
