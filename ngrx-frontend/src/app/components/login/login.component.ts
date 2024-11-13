import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { error } from 'console';
import { AppState } from '../../app.state';
import { Login } from '../../store/actions/user.action';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { SelectUserFeature } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  userInfo$ : Observable<User | null>

  form:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private store:Store<AppState>
  ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),]]
    })

    this.userInfo$ = this.store.select(SelectUserFeature);
  }

  submit():void {
    if (this.form.valid) {
      this.store.dispatch(Login({ formData: this.form.getRawValue() }));
    }
  }
  
  /*this.httpClient.post("http://localhost:3000/user/login", this.form.getRawValue(),{withCredentials:true})
  .subscribe(
    (response) => {this.router.navigate(['/']);},
    (error) => {
      const errorMessage = error.error?.message || 'An unknown error occurred';
      console.log(errorMessage);
    }
  );
  */

}
