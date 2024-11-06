import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = environment.API_URL;
  constructor(private client: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(this.API_URL);
  }
}
