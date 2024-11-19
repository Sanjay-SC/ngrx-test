import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartsDataService extends DefaultDataService<Product> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super('Cart', http, httpUrlGenerator)
    }

    override getAll(): Observable<Product[]> {
        return this.http.get(`http://localhost:3000/cart`)
        .pipe(
            map((data: any)=>{
                const posts: Product[] = [];
                for(let key in data){
                    posts.push({...data[key], id: key})
                }
                return posts;
            })
        )
    }

    override add(post: Product): Observable<Product>{
        return this.http.post(`http://localhost:3000/cart`, post)
        .pipe(
            map((data: any)=>{
                return {...post, id: data.id}
            })
        )
    }

    override update(post: Update<Product>): Observable<Product> {
        return this.http
        .put<Product>(`https://vue-completecourse.firebaseio.com/post/${post.id}.json`, {...post.changes})
    }

    override delete(id: string): Observable<string>{
        return this.http
        .delete<string>(`http://localhost:3000/cart/${id}`)
        .pipe(
            map(data =>{
                return id;
            })
        )
    }

}
