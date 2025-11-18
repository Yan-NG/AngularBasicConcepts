import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, map,of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productUrl:string = 'https://646bb5717d3c1cae4ce42faa.mockapi.io/test/Products'
  private readonly http:HttpClient = inject(HttpClient);

  getProducts():Observable<Product[]>{
   return this.http.get<Product[]>(this.productUrl).pipe(
      catchError(this.handleError)
    )
  }
  getProduct(id:string):Observable<Product>{
   return this.http.get<Product>(`${this.productUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // add this import near the top of the file:

  searchProduct(term: string): Observable<Product[]> {
    const searchTerm = term.trim().toLowerCase();
    return this.http.get<Product[]>(this.productUrl).pipe(
      map(products => products.filter(p => p.name?.toLowerCase().includes(searchTerm))),
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse):Observable<never>{
    let errorMessage = `**There was an error trying to load Product information.** `
    console.error(`PRODUCT SERVICE ERROR: Status:${err.status} Message: ${err.message}`)
    return throwError(()=>errorMessage)
  }

}
