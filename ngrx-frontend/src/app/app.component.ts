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
          this.router.navigateByUrl(lastVisitedPage); // Navigate to last visited page
        } else {
          this.router.navigate(['/']); // Default to home page
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
            filter((event) => event instanceof NavigationEnd) // Track only NavigationEnd events
          )
          .subscribe((event: NavigationEnd) => {
            if (event.urlAfterRedirects !== '/login') {
              // Only save the route if it's not the login page
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

  // Safely set a sessionStorage item
  private setSessionStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  }



}
