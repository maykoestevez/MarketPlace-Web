import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  $product!: Observable<Product>;
  productForm!: FormGroup;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.productForm = formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      category: [''],
      quantity: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] | 0;
    this.getProductById(id);
  }

  getProductById(productId: number) {
    this.productService
      .getProductById(productId)
      .subscribe(product => this.productForm.setValue(product));

  }

  async save() {
    try {
      const product = this.productForm.value;
      await this.productService.updateProduct(product).toPromise();
      this.router.navigate(['product-list']);
    } catch (error) {
      alert(error);
    }

  }

}
