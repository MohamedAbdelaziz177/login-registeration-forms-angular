import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = [
    {
      name: 'Wireless Headphones',
      price: 120,
      image: 'https://via.placeholder.com/250x250?text=Headphones',
    },
    {
      name: 'Smart Watch',
      price: 99,
      image: 'https://via.placeholder.com/250x250?text=Smart+Watch',
    },
    {
      name: 'Gaming Mouse',
      price: 49,
      image: 'https://via.placeholder.com/250x250?text=Mouse',
    },
    {
      name: 'Laptop Backpack',
      price: 60,
      image: 'https://via.placeholder.com/250x250?text=Backpack',
    }
  ];
}
