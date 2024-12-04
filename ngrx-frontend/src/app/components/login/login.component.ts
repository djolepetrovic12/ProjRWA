import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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


}
