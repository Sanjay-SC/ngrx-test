import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product.resolver';
import { CartResolver } from './cart.resolver';
import { LayoutComponent } from './layout/layout.component';


const AUTHLAYOUT_ROUTES: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },

  {
    path: 'product', 
   loadComponent: () => import('./product/product.component').then(mod => mod.ProductComponent),
   resolve: { posts: ProductResolver, cart: CartResolver } 
 },
 {
   path: 'cart', 
  loadComponent: () => import('./cart/cart.component').then(mod => mod.CartComponent),
  resolve: { cart: CartResolver } 
}
]

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: AUTHLAYOUT_ROUTES
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
