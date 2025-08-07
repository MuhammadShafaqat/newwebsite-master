import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../_models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private product: ShopService, private cart:CartService) {}

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
    return this.products.filter((p) => p.featured && p.isActive);
  }

  get regularProducts() {
    return this.products.filter((p) => p.isActive); // includes both featured and non-featured
  }

addToCart(product: Product) {
 
    const isInCart = this.cart.isInCart(product.id!);

  if (isInCart) {
    // Get current quantity of the item
    const existingItem = this.cart.getCartItems().find(item => item.id === product.id);
    const newQuantity = (existingItem?.quantity || 0) + 1;
    this.cart.updateQuantity(product.id!, newQuantity);
  } else {
    this.cart.addToCart({ ...product, quantity: 1 });
  }
}


}
