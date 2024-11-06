import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {ProductCardComponent} from "../../components/products/card/card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  getRandomProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products.slice(0, 3);
    });
  }
  ngOnInit(): void {
    this.getRandomProducts();
  }
}
