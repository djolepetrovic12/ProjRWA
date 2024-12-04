import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { filter, Observable, of } from 'rxjs';
import { SelectAuthFeature } from './store/selectors/user.selector';
import { NavigationEnd, Router } from '@angular/router';
import { RehydrateAuth } from './store/actions/user.action';

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
  )
  {
    this.store.dispatch(RehydrateAuth())
  }

  ngOnInit(): void {
    this.authenticated$ = this.store.select(SelectAuthFeature);
    this.authenticated$.subscribe((auth)=>{
      
      if(auth)
      {
        const lastVisitedPage = this.getSessionStorageItem('lastVisitedPage');
        if (lastVisitedPage) {
          this.router.navigateByUrl(lastVisitedPage);
        } else {
          this.router.navigate(['/']);
        }
      }
      else
      {
        this.router.navigate(['/login']);
      }
    });


    this.authenticated$.subscribe((auth) => {
      if (auth) {
        this.router.events
          .pipe(
            filter((event) => event instanceof NavigationEnd)
          )
          .subscribe((event: NavigationEnd) => {
            if (event.urlAfterRedirects !== '/login' && event.urlAfterRedirects !== '/register') {
              this.setSessionStorageItem('lastVisitedPage', event.urlAfterRedirects);
            }
          });
      }
    });
  }

  private getSessionStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  private setSessionStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  }



}
