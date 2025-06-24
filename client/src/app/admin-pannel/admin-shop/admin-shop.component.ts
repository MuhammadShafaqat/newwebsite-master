import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Product } from '../../_models/product';
import { AdminshopService } from '../admin-services/adminshop.service';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.scss']
})
export class AdminShopComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  selectedProduct: Product | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adminShop: AdminshopService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      price: [''],
      description: [''],
      stock: [''],
      mediaType: ['image'],
      isExternal: [false],
      externalUrl: [''],
      isActive: [true],
      featured: [false],
      size: ['M']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.adminShop.getAllProducts().subscribe(data => this.products = data);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  submitForm() {
    const formValues = this.productForm.value;
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.selectedProduct) {
      this.adminShop.updateProduct(this.selectedProduct.id!, formData).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.adminShop.createProduct(formData).subscribe(() => {
        this.resetForm();
      });
    }
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
  }

  deleteProduct(id: string) {
    this.adminShop.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  toggleActive(id: string) {
    this.adminShop.toggleActive(id).subscribe(() => this.loadProducts());
  }

  resetForm() {
    this.productForm.reset();
    this.selectedProduct = null;
    this.selectedFile = null;
    this.loadProducts();
  }
}
