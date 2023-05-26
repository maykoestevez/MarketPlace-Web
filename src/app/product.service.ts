import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "./product";

@Injectable({ providedIn: 'root' })
export class ProductService {

    apiUrl: string = environment.api;

    constructor(private httpClient: HttpClient) {

    }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.apiUrl}/product`);
    }

    getProductById(productId: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.apiUrl}/product/${productId}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(`${this.apiUrl}/product`, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.httpClient.put<Product>(`${this.apiUrl}/product`, product);
    }

    deleteProduct(productId: number): Observable<object> {
        return this.httpClient.delete(`${this.apiUrl}/product/${productId}`);
    }
}