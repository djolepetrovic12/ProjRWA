import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { UpdateAFlashcard } from '../../../store/actions/flashcard.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { Inject } from '@angular/core';

@Component({
  selector: 'app-update-flashcard-dialog',
  templateUrl: './update-flashcard-dialog.component.html',
  styleUrl: './update-flashcard-dialog.component.scss'
})
export class UpdateFlashcardDialogComponent implements OnInit {

  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);
  form: FormGroup;
  fcOptions :string[] = ['word','phrase','sentence','general'];

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
      content:[this.data.content,[Validators.required,Validators.minLength(2)]],
      type:[this.data.type,[Validators.required]],
      explanation:[this.data.explanation,[Validators.required,Validators.minLength(10)]]
    })
  }

  submit(){
    //console.log(this.data.id);
    if (this.form.valid) {
          this.store.dispatch(UpdateAFlashcard({id: this.data.id,formData: this.form.getRawValue()}));
    }
    this.matDialogRef.closeAll();
  }

}

