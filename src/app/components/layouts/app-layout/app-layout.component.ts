import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NotificationComponent} from "../../notification/notification.component";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user";
import {CommonModule} from "@angular/common";
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../interfaces/product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, CommonModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {
  currentUser: User | null = null;
  cart: Product[] = [];
  cartCount: number = this.cart.length;

  private cartSubscription?: Subscription;
  private currentUserSubscription!: Subscription;

  constructor(private authService: AuthService, private productsService: ProductsService) {}

  getUserFirstLetter(): string {
    if (!this.currentUser) return '';
    return this.currentUser?.name.charAt(0).toUpperCase();
  }

  getCartSubtotal(): string {
    const sum = this.cart.reduce((acc, product) => acc + (Number(product.price) || 0), 0);
    return sum.toFixed(2);
  }

  removeFromCart(product: Product): void {
    this.productsService.removeFromCart(product);
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    this.cartSubscription = this.productsService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartCount = this.cart.length;
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
