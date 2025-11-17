import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hot-ncold-observables',
  imports: [],
  templateUrl: './hot-ncold-observables.html',
  styleUrl: './hot-ncold-observables.scss',
})
export class HotNcoldObservables {
  randomNumber2:number = Math.floor(Math.random()*90) + 10;
  // Cold Observable
  //Cold observables (e.g., HttpClient) create their execution on subscribe; each subscriber can trigger its own network call.

  coldObservable$ = new Observable<number>((observer)=>{
      const randomNumber = Math.floor(Math.random()*90) + 10;
      observer.next(randomNumber); //Emit of random number
      observer.complete();
  });
  // Hot Observables
  //Hot observables (e.g., Subjects, event listeners) emit regardless of subscribers; use shareReplay/shared behaviors to avoid duplicate work and control lifecycles.
  hotObservable$ = new Observable<number>((observer)=>{
      observer.next(this.randomNumber2); //Emit of random number
      observer.complete();
  });

  constructor(){
    // With cold observable each subscriber will get a unique stream of data - as the data is emitted on each subscription.
    this.coldObservable$.subscribe({
      next:(value)=>console.log(`Cold Subscriber 1 ${value}`)
    })
    this.coldObservable$.subscribe({
      next:(value)=>console.log(`Cold Subscriber 2 ${value}`)
    })

    //In this case each subscriber will get the same value cz hot observables share a single execution and delivers the same value to all the subscribers
    //multicasting

    this.hotObservable$.subscribe({
      next:(value)=>console.log(`Hot Subscriber 1 ${value}`)
    })
    this.hotObservable$.subscribe({
      next:(value)=>console.log(`Hot Subscriber 2 ${value}`)
    })
  }

}
