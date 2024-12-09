import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

import { provideToastr, ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$!: Observable<Product[]>;
  total = 0;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.entities$;
    this.cartService.entities$.subscribe(
      (resp: any) => {
        this.total = 0;
        if (resp?.length) {
          
          for (let i = 0; i < resp.length; i++) {
            this.total = this.total + resp[i].price;
          }
        }
      }
    )

  }

  delete(product: any) {

    let text = `Want to delete ${product.name}?`;
    if (confirm(text) == true) {

      this.toastr.success('Item added to cart', 'Success', {
        timeOut: 3000
      });
      this.cartService.delete(product.ids);
    } else {
    }
  }
}