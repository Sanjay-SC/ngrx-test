import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ToastrModule],
  providers: [
    // provideToastr(), // Toastr providers
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product$!: Observable<Product[]>;
  cart$!: Observable<Product[]>;

  cartList: any;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.product$ =this.ProductService.getAll();
    this.product$ = this.productService.entities$;
    this.cart$ = this.cartService.entities$;

    this.cartService.entities$.subscribe(
      (resp: any) => {
        this.cartList = resp;
      })
  }

  hideBtnCart(id: any) {
    let idx = this.cartList.findIndex((x: any) => x.id == id);
    if (idx > -1) {
      return true
    }
    return false;
  }

  cart() {
    this.router.navigate(['/cart']);
  }

  addToCart(product: any) {

    let text = `Want to add ${product.name}?`;
    if (confirm(text) == true) {

      this.toastr.success('Item added to cart', 'Suucess', {
        timeOut: 3000
      });
      this.cartService.add(product);
    } else {
    }
  }

}
