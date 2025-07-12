import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_models/product';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
// product-detail.component.ts
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity = 1;

  constructor(private cart: CartService, private route: ActivatedRoute,
  private productService: ShopService,) {}
  ngOnInit(): void {
   const productId = this.route.snapshot.paramMap.get('id');
  if (productId) {
    this.productService.getProductById(productId).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error('Error loading product:', err),
    });
  }
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    this.cart.addToCart({ ...this.product, quantity: this.quantity });
  }
}
