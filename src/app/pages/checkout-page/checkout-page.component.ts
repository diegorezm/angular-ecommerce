import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {CommonModule} from "@angular/common";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {genId} from "../../../utils/gen-id";
import {Order} from "../../interfaces/order";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  currentUser: User | null = null;
  cart: Product[] = [];
  loading = false;

  private cartSubscription?: Subscription;
  private currentUserSubscription!: Subscription;

  constructor(private productsService: ProductsService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private orderService: OrdersService,
    private router: Router) {}

  placeOrder(): void {
    if (!this.currentUser) {
      this.notificationService.error('You must be logged in to place an order!');
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const order: Order = {
        id: genId(),
        userId: this.currentUser?.id!,
        products: this.cart,
        total: Number.parseFloat(this.getCartSubtotal())
      };
      this.orderService.placeOrder(order);
      this.loading = false;
      this.notificationService.success('Order placed successfully');
      this.productsService.clearCart();
      this.router.navigate(['/products']);
    }, 2000);
  }

  getCartSubtotal(): string {
    const sum = this.cart.reduce((acc, product) => acc + (Number(product.price) || 0), 0);
    return sum.toFixed(2);
  }

  removeFromCart(product: Product): void {
    this.productsService.removeFromCart(product);
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    this.cartSubscription = this.productsService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
