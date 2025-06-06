import { Component } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price?: number;
  image: string;
  isFeatured: boolean;
  isExternal?: boolean;
  externalUrl?: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
products: Product[] = [
  {
    id: 1,
    title: 'Besticktes Cap «Revolution»',
    price: 19.0,
    image: '/assets/images/shops/cap-bestickt-revolution-1-700x700.webp',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Revolution Book (Amazon)',
    image: '/assets/images/shops/tanktop-grau-juso-800x800.webp',
    isExternal: true,
    isFeatured: false,
    externalUrl: 'https://www.amazon.com/dp/example',
  },
  {
    id: 3,
    title: 'T-Shirt «Solidarität»',
    price: 25.0,
    image: '/assets/images/shops/cap-bestickt-revolution-1-700x700.webp',

    isFeatured: true,
  },
  {
    id: 4,
    title: 'Sticker-Set BKP',
    price: 5.0,
    image: '/assets/images/shops/tanktop-grau-juso-800x800.webp',
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Hoodie «Klasse statt Masse»',
    price: 45.0,
    image: '/assets/images/shops/cap-bestickt-revolution-1-700x700.webp',
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Drinking Bottle – Red Logo',
    price: 15.0,
    image: '/assets/images/shops/cap-bestickt-revolution-1-700x700.webp',
    isFeatured: false,
  }, 
  {
    id: 7,
    title: 'Button Pins (Pack of 5)',
    price: 8.0,
    image: '/assets/images/shops/cap-bestickt-revolution-1-700x700.webp',
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Umbrella – BKP Edition',
    price: 22.0,
    image: '/assets/images/shops/tshirt-99-prozent-kampagne-female-800x800.webp',
    isFeatured: false,
  },
  {
    id: 9,
    title: 'Shopping Bag – 100% Fair Trade',
    price: 12.0,
    image: '/assets/images/shops/tshirt-99-prozent-kampagne-male-700x700.webp',
    isFeatured: true,
  },
];


  get featuredProducts() {
    return this.products.filter((p) => p.isFeatured);
  }

  get regularProducts() {
    return this.products;
  }
}
