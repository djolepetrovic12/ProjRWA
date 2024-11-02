import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable, of } from 'rxjs';
import { SelectAuthFeature } from './store/selectors/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  authenticated$: Observable<boolean> = of(false);
  constructor(
    private store:Store<AppState>,
    private router:Router
  ){}

  ngOnInit(): void {
    this.authenticated$ = this.store.select(SelectAuthFeature);
    this.authenticated$.subscribe((auth)=>{
      if(auth)
      {
        this.router.navigate(['/']);
      }
      else
      {
        this.router.navigate(['/login']);
      }
    })

  }


}
