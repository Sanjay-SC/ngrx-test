import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CartService } from "./services/cart.service";

@Injectable()
export class CartResolver implements Resolve<boolean>{
    constructor(
        private cartService: CartService
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

            return this.cartService.loaded$.pipe(
                tap(loaded =>{
                    if(!loaded){
                        this.cartService.getAll();
                    }
                }),
                first()
            )
    }
}