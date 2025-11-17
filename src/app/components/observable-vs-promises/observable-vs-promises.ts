import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-vs-promises',
  imports: [],
  templateUrl: './observable-vs-promises.html',
  styleUrl: './observable-vs-promises.scss',
})
export class ObservableVsPromises {
  //Observables has 3 callbacks (success, error, complete) Promises only have two(success , error)
  anObservable:any
  aPromise:any
  aSubscription:any

  // If we execute create only the promise will be created //observables are lazy
  create(){
    this.anObservable = new Observable<string>((observer)=>{
      console.log(`Observable has been created`)
      //Observables can be emitted multiple times
      // observer.next(`Observable Emitted 1`)
      // observer.next(`Observable Emitted 2`)
      // observer.next(`Observable Emitted 3`)
      setInterval(()=>{
        //with the correct delay observable can be cancel before it gets emitted
        observer.next(`Observable Emitted`)
      }, 5000)
    })
    this.aPromise = new Promise<string>((resolve)=>{
      console.log(`Promise has been created`)
      //Promises only are Emitted one time
      // resolve(`Promise Emitted 1`)
      // resolve(`Promise Emitted 2`)
      // resolve(`Promise Emitted 3`)
      setInterval(()=>{
        resolve(`Promise Emitted`)
      },5000)
    })
  }
  execute(){
    this.aSubscription = this.anObservable.subscribe((data:string)=>{
      console.log(data)
    })
    this.aPromise.then((data:string)=>{
      console.log(data)
    })
  }
  cancel(){
    // Observables are cancelable but Promises are not
    this.aSubscription.unsubscribe();
  }

}
