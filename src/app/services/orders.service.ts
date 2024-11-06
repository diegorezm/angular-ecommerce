import {Injectable} from '@angular/core';
import {Order} from "../interfaces/order";

const ORDER_KEY = 'orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() {}

  placeOrder(order: Order): void {
    const orders = localStorage.getItem(ORDER_KEY);
    if (orders) {
      const parsedOrders = JSON.parse(orders);
      parsedOrders.push(order);
      localStorage.setItem(ORDER_KEY, JSON.stringify(parsedOrders));
    } else {
      localStorage.setItem(ORDER_KEY, JSON.stringify([order]));
    }
  }

  getOrders(userId: number): Order[] {
    const orders = localStorage.getItem(ORDER_KEY);
    if (orders) {
      const parsedOrders = JSON.parse(orders) as Order[];
      return parsedOrders.filter(order => order.userId === userId);
    }
    return [];
  }

}
