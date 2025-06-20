import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Product } from '../_models/product';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private product:ShopService){}

ngOnInit(): void {
   this.product.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Fetched products:', data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  get featuredProducts() {
    return this.products.filter((p) => p.isFeatured);
  }

  get regularProducts() {
    return this.products;
  }
}
