import { Component, signal, OnInit, OnDestroy  } from '@angular/core';
import { Product } from '../../models/product';
import { catchError, debounceTime, distinctUntilChanged, finalize, Subject, switchMap, takeUntil, of } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rx-js-operators',
  imports: [FormsModule],
  templateUrl: './rx-js-operators.html',
  styleUrl: './rx-js-operators.scss',
})
export class RxJsOperators implements OnInit, OnDestroy{

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  searchTerm = signal<string>('');
  destroy$ = new Subject<void>();
  search$ = new Subject<string>();
  errorMessage:string = '';

  constructor(private readonly productService:ProductService){
  }

  ngOnInit():void{
    this.getProducts()
    this.search$.pipe(
      debounceTime(200),//debounceTime(): it will wait till the emission of values from an Observable by a specified time. If a new value arrives before the time elapses, the previous value is dropped.
      distinctUntilChanged(), //distinctUntilChanged() : It suppresses duplicate consecutive emissions from an Observable. A new value is emitted only if it's different from the previous one
      //switchMap() :maps each value from the source Observable to a new inner Observable, cancelling the previous one if a new value arrives before it completes.
      switchMap(term =>
      this.productService.searchProduct(term).pipe(
        catchError(err => {
          this.errorMessage = String(err);
          return of([] as Product[]); //of() creates an Observable that emits the arguments you pass to it — either a single value or multiple values — and then completes.

        })
      )
    ),
      // catchError(err=>this.errorMessage=err)
    ).subscribe({
      next:(products:Product[])=>{
        this.products.set(products)
      },
      error:(err:string)=>this.errorMessage= err
    })
  }

  private getProducts(){
    this.isLoading.set(true)

    //pipe() is a method available on RxJS Observables.It takes any number of RxJS operators as arguments. Each operator processes the stream and passes the result to the next.
    this.productService.getProducts().pipe(
      finalize(()=>this.isLoading.set(false)),//finalize() Clean up state
      //map(),//map()The map operator transforms each value emitted by an Observable using a provided function — similar to Array.prototype.map, but for streams.
      takeUntil(this.destroy$) //takeUntil() is use to stop the send of the data
    ).subscribe({
      next:(products)=>{
        this.products.set(products)
      },
      error:(err)=>this.errorMessage= err
    })
  }
  onSearch(term:string){
    this.search$.next(term)
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
