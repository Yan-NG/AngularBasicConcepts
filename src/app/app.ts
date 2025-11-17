import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObservableVsPromises } from './components/observable-vs-promises/observable-vs-promises';
import { HotNcoldObservables } from './components/hot-ncold-observables/hot-ncold-observables';
import { HandleErrorsObservable } from './components/handle-errors-observable/handle-errors-observable';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
      ObservableVsPromises,
      HotNcoldObservables,
      HandleErrorsObservable,
      ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'AngularBasicConcepts';
}
