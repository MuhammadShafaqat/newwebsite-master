// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_models/product';

export interface CartItem extends Product {
  id?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartItem) {
    const existing = this.cart.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.cart.find(p => p.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartSubject.next(this.cart);
    }
  }

  removeItem(id: string) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
