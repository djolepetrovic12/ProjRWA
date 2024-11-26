import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { UpdateMyStudyResource } from '../../../store/actions/studyResource.actions';

@Component({
  selector: 'app-update-study-resource-dialog',
  templateUrl: './update-study-resource-dialog.component.html',
  styleUrl: './update-study-resource-dialog.component.scss'
})
export class UpdateStudyResourceDialogComponent implements OnInit {

  
  form:FormGroup;
  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);

  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private router:Router,
    private store:Store<AppState>,
    private matDialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      title:[this.data.title,[Validators.required,Validators.minLength(3)]],
      description:[this.data.description,[Validators.required,Validators.minLength(3)]]
    })
  }

  submit() {
    this.userID$.pipe(take(1)).subscribe((userID) => {
      if (userID === this.data.user.id && this.form.valid ) {
        this.store.dispatch(UpdateMyStudyResource({id: this.data.id,formData: this.form.getRawValue()}));
      }
      else
      {
        alert('You do not have permission to edit another person\'s studyResource');
        this.matDialogRef.closeAll();
      }
    });
    this.matDialogRef.closeAll();
  }

}
