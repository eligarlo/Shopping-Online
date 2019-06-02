import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {mimeType} from '../../../validators/mime-type.validator';

import { CategoryService } from '../../../services/management/category.service';
import {ProductService} from '../../../services/management/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories: any;
  defaultCategory = 'Milk & Eggs';
  imagePlaceHolder = 'Choose File';
  addProductForm: FormGroup;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.categories;
    });
    this.addProductForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required]}),
      price: new FormControl(null, { validators: [Validators.required]}),
      category: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.addProductForm.controls.category.setValue(this.defaultCategory, { onlySelf: true });
  }

  onAddProduct() {
    if (this.addProductForm.value.image) {
      if ((this.addProductForm.invalid && this.addProductForm.value.image.type === 'image/svg+xml') || this.addProductForm.valid) {
        this.productService.addProduct(
          this.addProductForm.value.name,
          this.addProductForm.value.price,
          this.addProductForm.value.category,
          this.addProductForm.value.image)
          .subscribe(res => {
          console.log(res);
        });
      }
    }
    if (this.addProductForm.invalid) {
      return;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addProductForm.patchValue({ image: file });
    this.addProductForm.get('image').updateValueAndValidity();
    if (this.addProductForm.value.image) {
      this.imagePlaceHolder = this.addProductForm.value.image.name;
    }
  }

}
