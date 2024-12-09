import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
@Input() product: any;
@Input() idx: any;

cart$!: Observable<Product[]>;
cartList: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.product$ =this.ProductService.getAll();
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
  let idx = this.cartList.findIndex((x: any) => x.id == product.id);
  if (idx == -1) {

    let text = `Want to add ${product.name}?`;
    if (confirm(text) == true) {

      this.toastr.success('Item added to cart', 'Suucess', {
        timeOut: 3000
      });
      this.cartService.add(product);
    } else {
    }
  }

  else {
    this.cart();
  }

}
}
