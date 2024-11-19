import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService extends EntityCollectionServiceBase<Product> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Cart', serviceElementsFactory);
  }
}
