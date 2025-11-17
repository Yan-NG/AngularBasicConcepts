import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObservableVsPromises } from './components/observable-vs-promises/observable-vs-promises';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ObservableVsPromises ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'AngularBasicConcepts';
}
