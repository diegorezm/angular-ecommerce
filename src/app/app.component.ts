import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductsService} from "./services/products.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private productService: ProductsService) {
    const products = this.productService.getProducts();
    products.subscribe(products => console.log(products));
  }
}
