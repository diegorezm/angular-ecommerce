import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  product: Product | undefined = undefined;
  loading = true;
  inCart = false;
  private routeSubscription!: Subscription;
  private cartSubscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productsService.getProducts().subscribe(products => {
        this.product = products.find(p => Number(p.id) === Number(id));
        if (!this.product) {
          this.notificationService.error('Product not found');
        }
        this.loading = false;
      });
    });

    this.cartSubscription = this.productsService.cart$.subscribe(cart => {
      if (this.product) {
        this.inCart = cart.some(p => Number(p.id) === Number(this.product?.id));
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;
    this.productsService.addToCart(this.product);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}

