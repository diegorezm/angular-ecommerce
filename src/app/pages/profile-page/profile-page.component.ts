import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {Order} from "../../interfaces/order";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  currentUser: User | null = null;
  orders: Order[] = [];

  private userSubscription?: Subscription;

  constructor(private authService: AuthService, private orderService: OrdersService) {}


  getUserFirstLetter(): string {
    if (!this.currentUser) return '';
    return this.currentUser?.name.charAt(0).toUpperCase();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (!user) return;
      this.orders = this.orderService.getOrders(user.id);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
