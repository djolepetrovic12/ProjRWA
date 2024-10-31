import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form:FormGroup
  constructor(private formBuilder:FormBuilder,private httpClient:HttpClient,private router:Router){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),]]
    })
  }

  submit():void {
    this.httpClient.post("http://localhost:3000/user/login", this.form.getRawValue(),{withCredentials:true})
    .subscribe(
      (response) => {this.router.navigate(['/']);},
      (error) => {
        const errorMessage = error.error?.message || 'An unknown error occurred';
        console.log(errorMessage);
      }
    );
  }



  //.subscribe(() => this.router.navigate(['/']));

  /*
          next: (response) => {
          // Handle successful login (e.g., navigate to dashboard)
          console.log('Login successful', response);
        },
        error: (error) => {
          // Set the error message to be displayed
          this.errorMessage = error;


  */


}
