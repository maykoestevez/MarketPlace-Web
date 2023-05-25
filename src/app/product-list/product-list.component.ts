import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  $products!: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.$products = this.productService.getProducts();
  }

  navigateToDetails(productId: number): void {
    this.router.navigate([`/product-details/${productId}`])
  }

}
