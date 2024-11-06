import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../interfaces/product";

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly PRODUCTS_FILE = '/products.json';

  private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor(private client: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(this.PRODUCTS_FILE);
  }

  private loadCart(): Product[] {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: Product[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): Observable<Product[]> {
    return this.cart$;
  }

  clearCart(): void {
    localStorage.removeItem(CART_KEY);
    this.cartSubject.next([]);
  }

  addToCart(product: Product): void {
    const cart = this.cartSubject.value;
    if (cart.some(p => p.id === product.id)) return;
    cart.push(product);
    this.saveCart(cart);
  }

  removeFromCart(product: Product): void {
    const cart = this.cartSubject.value.filter(p => p.id !== product.id);
    this.saveCart(cart);
  }

  isInCart(product: Product): boolean {
    return this.cartSubject.value.some(p => p.id === product.id);
  }
}

