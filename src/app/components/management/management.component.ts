import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  editCategory: boolean;
  editProduct: boolean;

  constructor() { }

  ngOnInit() {
  }

  onEditCategory() {
    this.editCategory = true;
    this.editProduct = false;
  }

  onEditProduct() {
    this.editProduct = true;
    this.editCategory = false;
  }

}
