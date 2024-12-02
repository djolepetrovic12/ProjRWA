import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateUser } from '../../store/actions/user.action';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss'
})
export class UpdateUserDialogComponent {
  form: FormGroup;
  fcOptions :string[] = ['professor','student','admin'];

  constructor(
    private formBuilder:FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private store:Store<AppState>,
    private matDialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      name:[this.data.name,[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      surname:[this.data.surname,[Validators.minLength(2),Validators.required,Validators.maxLength(50)]],
      username:[this.data.username,[Validators.pattern("^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$"),Validators.minLength(3),Validators.required]],
      email:[this.data.email,[Validators.required,Validators.email]],
      role:[this.data.role,[Validators.required]],
    });

    
  }

  submit() :void {

    this.store.dispatch(UpdateUser({id:this.data.id, formData: this.form.getRawValue()}))
    this.matDialogRef.closeAll();
    }
}
