import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  cart$!: Observable<Product[]>;
  constructor(
    private cartService: CartService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.entities$;
  }
}
