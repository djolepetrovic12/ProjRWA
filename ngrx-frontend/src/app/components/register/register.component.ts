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

  constructor(
    private formBuilder:FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private store:Store<AppState>
  ){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      //pronadji i istestiraj regex za imena i prezimena, jer svi isprobani regexi vracaju error odmah
      name:['',[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      surname:['',[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      //kad pravis tekst iznad ovog polja, napisi sledece: username must start with a letter or number, can't contain two consecutive dots or underscores and must end with a letter or number
      username:['',[Validators.pattern("^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$"),Validators.minLength(3),Validators.required]],
      email:['',[Validators.required,Validators.email]],
      //obavezno za lozinke dodaj regex koji dozvoljava samo jake sifre
      password:['',[Validators.required,Validators.minLength(8),]]
    });

    
  }

  submit() :void {

    this.store.dispatch(Register({ formData: this.form.getRawValue()}))

    //console.log(this.form.getRawValue());

    /*
    this.httpClient.post("http://localhost:3000/user/register", this.form.getRawValue())
    .subscribe(() => this.router.navigate(['/login']));*/
    }
}
