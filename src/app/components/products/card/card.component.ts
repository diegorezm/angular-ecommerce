import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/product";
import {ProductsService} from "../../../services/products.service";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  inCart = false;
  private cartSubscription!: Subscription;
  constructor(private productsService: ProductsService) {}

  addToCart(): void {
    this.productsService.addToCart(this.product);
    this.inCart = true;
  }

  ngOnInit(): void {
    if (!this.product) throw new Error('Product is required');
    this.cartSubscription = this.productsService.getCart().subscribe(() => {
      this.inCart = this.productsService.isInCart(this.product);
    });
  }

  ngOnDestroy(): void {
    if (!this.cartSubscription) return;
    this.cartSubscription.unsubscribe();
  }

}
