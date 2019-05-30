import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/management/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  alertMessage = {
    addCategory: ''
  };

  successMessage = {
    addCategory: ''
  };

  inputsValidation = {
    addCategory: false
  };

  successValidation = {
    addCategory: false
  };

  addCategoryForm: FormGroup;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.addCategoryForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onAddCategory() {
    if (this.addCategoryForm.invalid) {
      this.resetAllValidation();
      this.inputsValidation.addCategory = true;
      this.alertMessage.addCategory = 'Please enter category!';
      return;
    }
    this.categoryService.addCategory(this.addCategoryForm.value).subscribe(res => {
      if (res.result) {
        this.resetAllValidation();
        this.addCategoryForm.reset();
        this.successValidation.addCategory = true;
        this.successMessage.addCategory = res.message;
      }
      console.log(res);
    });
  }

  private resetAllValidation() {
    this.alertMessage.addCategory = '';
    this.inputsValidation.addCategory = false;
    this.successMessage.addCategory = '';
    this.successValidation.addCategory = false;
  }

}
