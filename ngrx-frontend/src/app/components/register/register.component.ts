import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Register } from '../../store/actions/user.action';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{


  form: FormGroup;
  fcOptions :string[] = ['professor','student'];

  constructor(
    private formBuilder:FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private store:Store<AppState>
  ){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      name:['',[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      surname:['',[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      username:['',[Validators.pattern("^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$"),Validators.minLength(3),Validators.required]],
      email:['',[Validators.required,Validators.email]],
      role:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),]]
    });

    
  }

  submit() :void {
    this.store.dispatch(Register({ formData: this.form.getRawValue()}))
    }
}
