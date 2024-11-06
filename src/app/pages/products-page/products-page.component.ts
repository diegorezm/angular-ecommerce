import {Component, OnInit} from '@angular/core';
import {Catergory, Product} from "../../interfaces/product";
import {ProductsService} from "../../services/products.service";
import {ProductCardComponent} from "../../components/products/card/card.component";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  search = '';
  category: Catergory | 'all' = 'all';
  availableCategories = ['shoes', 'pants', 'shirt', 'hat'];

  paginatedProducts: Product[] = [];
  products: Product[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  pages: number[] = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  goToPage(n: number): void {
    if (n > 0 && n <= this.totalPages && n !== this.currentPage) {
      this.currentPage = n;
      this.updatePagination();
    }
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedProducts = this.products.filter(p => {
      const matchSearch = this.search === '' || p.name.toLowerCase().includes(this.search.toLowerCase());
      const matchCategory = this.category === 'all' || p.category === this.category;
      return matchSearch && matchCategory;
    });

    const filteredLength = this.paginatedProducts.length;

    this.totalPages = Math.ceil(filteredLength / this.pageSize);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.paginatedProducts = this.paginatedProducts.slice(start, end);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: this.currentPage, search: this.search, category: this.category},
      queryParamsHandling: 'merge',
    });

    window.scrollTo(0, 0);
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.currentPage = 1;
    this.updatePagination();
  }

  onCategoryChange(selectedCategory: Catergory | 'all'): void {
    this.category = selectedCategory;
    this.currentPage = 1;
    this.updatePagination();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      const search = params['search'] || '';
      const category = params['category'] as Catergory || 'all';

      this.currentPage = page;
      this.search = search;
      this.category = category;

      this.productsService.getProducts().subscribe(products => {
        this.products = products;
        this.updatePagination();
      });
    });
  }
}

