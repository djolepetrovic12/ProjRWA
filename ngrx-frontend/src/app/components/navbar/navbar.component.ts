import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SelectAuthFeature, SelectUserRoleFeature } from '../../store/selectors/user.selector';
import { Logout } from '../../store/actions/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  
  authenticated$ : Observable<boolean> = of(false);
  userRole$ : Observable<string | undefined> = of();

  constructor(
    private httpClient:HttpClient,
    private store: Store<AppState>,
    private router: Router
  ){}
  
  ngOnInit(): void {
    
    this.authenticated$ = this.store.select(SelectAuthFeature);
    this.userRole$ = this.store.select(SelectUserRoleFeature);
    
  }

  logout():void 
  {

    this.store.dispatch(Logout());

  }
   

}
