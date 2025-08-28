import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  customer = {
    name: '',
    email: '',
    customerIBAN: '',
    address: {
      street: '',
      postalCode: '',
      city: '',
      country: '',
      
    }
  };

  cardDetails = {
    
   
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartService.getTotalPrice();
  }

checkout() {
   if (!this.customer.name || !this.customer.email || !this.customer.address.street ||
      !this.customer.address.city || !this.customer.address.postalCode || !this.customer.address.country) {
    alert('❗ Please fill out all customer details before placing your order.');
    return;
  }
  const order = {
    items: this.cartItems.map(item => ({
      product: item.id as string,
      quantity: item.quantity
    })),
    customerName: this.customer.name,
    customerEmail: this.customer.email,
    customerAddress: this.customer.address,
    customerIBAN: this.customer.customerIBAN,   // ✅ Send IBAN
    paymentMethod: 'vorkasse' as 'vorkasse',
    totalAmount: this.total
  };

//   this.orderService.placeOrder(order).subscribe({
//     next: (res: any) => {
//       alert(`
// ✅ Order Placed Successfully!

// 💵 Please make a bank transfer to:

// IBAN: PK00HABB0000000000000000
// Account Title: My Shop
// Amount: CHF ${this.total}
// Reference: ORDER-${res._id}

// 🕒 Once we receive your payment, your order will be confirmed.
//       `);

//       this.cartService.clearCart();
//     },
//     error: (err) => {
//       console.error(err);
//       alert('❌ Failed to place order. Please try again.');
//     }
//   });
}

}
