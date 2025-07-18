import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_models/product';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity = 1;

  constructor(
    private cart: CartService,
    private route: ActivatedRoute,
    private productService: ShopService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;

          // ✅ If product already in cart, load its quantity
          const existingItem = this.cart.getCartItems().find(item => item.id === this.product.id);
          if (existingItem) {
            this.quantity = existingItem.quantity;
          }
        },
        error: (err) => console.error('Error loading product:', err),
      });
    }
  }

  increaseQty() {
    this.quantity++;
    this.syncCart();
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
      this.syncCart();
    }
  }

  addToCart() {
    const existingItem = this.cart.getCartItems().find(item => item.id === this.product.id);

    if (existingItem) {
      // ✅ Just increase quantity by 1 if already in cart
      const newQuantity = existingItem.quantity + 1;
      this.quantity = newQuantity;
      this.cart.updateQuantity(this.product.id!, newQuantity);
    } else {
      // ✅ Not in cart? Add it
      this.cart.addToCart({ ...this.product, quantity: this.quantity });
    }
  }

  private syncCart() {
    if (!this.product.id) return;

    const isInCart = this.cart.isInCart(this.product.id);
    if (isInCart) {
      this.cart.updateQuantity(this.product.id, this.quantity);
    }
    // 👇 Don't re-add in syncCart, only update if already exists
    // AddToCart button handles adding
  }
}
