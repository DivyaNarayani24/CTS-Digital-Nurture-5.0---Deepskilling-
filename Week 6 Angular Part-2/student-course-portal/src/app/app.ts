import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  isLoading$: Observable<boolean>;

  constructor(public loadingService: LoadingService) {
  this.isLoading$ = this.loadingService.isLoading$;
  
}
}