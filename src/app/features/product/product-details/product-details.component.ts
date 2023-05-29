import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  newProduct: boolean = false;
  productId: number = 0;
  productForm!: FormGroup;
  unsubscribe = new Subject();

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder) {

    this.productForm = formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      category: [''],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'] | 0;
    this.newProduct = this.productId === 0;
    if (!this.newProduct) this.getProductById(this.productId);
  }

  getProductById(productId: number) {
    this.productService
      .getProductById(productId).pipe(takeUntil(this.unsubscribe))
      .subscribe(product => this.productForm.setValue(product));

  }

  async save() {
    try {
      const product = this.productForm.value;

      if (this.newProduct) {
        await this.productService.createProduct(product).toPromise();
      } else {
        await this.productService.updateProduct(product).toPromise();
      }

      this.router.navigate(['product-list']);

    } catch (error) {
      alert(error);
    }

  }

  async delete() {
    try {
      await this.productService.deleteProduct(this.productId).toPromise();
      this.router.navigate(['product-list']);
    } catch (error) {
      alert(error)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

}
