import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ProductService } from './services/product.service';

@Injectable()
export class ProductResolver implements Resolve<boolean>{
    constructor(
        private productService: ProductService
    ){}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
            // return this.postService.loaded$.pipe(
            //     mergeMap(loaded=>{
            //         if(loaded){
            //             return of(true);
            //         }
            //         return this.postService.getAll().pipe(
            //             map(posts =>{
            //                 return !!posts;
            //             })
            //         )
            //     }),
            //     first()
            // )

            return this.productService.loaded$.pipe(
                tap(loaded =>{
                    if(!loaded){
                        this.productService.getAll();
                    }
                }),
                first()
            )
    }
}