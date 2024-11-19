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
export class ProductsDataService extends DefaultDataService<Product> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super('Product', http, httpUrlGenerator)
    }

    override getAll(): Observable<Product[]> {
        return this.http.get(`http://localhost:3000/products`)
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
        return this.http.post(`https://vue-completecourse.firebaseio.com/post.json`, post)
        .pipe(
            map((data: any)=>{
                return {...post, id: data.name}
            })
        )
    }

    override update(post: Update<Product>): Observable<Product> {
        return this.http
        .put<Product>(`https://vue-completecourse.firebaseio.com/post/${post.id}.json`, {...post.changes})
    }

    override delete(id: string): Observable<string>{
        return this.http
        .delete<string>(`https://vue-completecourse.firebaseio.com/post/${id}.json`)
        .pipe(
            map(data =>{
                return id;
            })
        )
    }

}
