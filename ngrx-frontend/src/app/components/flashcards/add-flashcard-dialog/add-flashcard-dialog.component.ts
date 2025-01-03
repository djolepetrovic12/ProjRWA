import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { CreateAFlashcard, UpdateAFlashcard } from '../../../store/actions/flashcard.actions';
import { SelectUserFeature, SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-flashcard-dialog',
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrl: './add-flashcard-dialog.component.scss'
})
export class AddFlashcardDialogComponent implements OnInit {
  
  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);
  form: FormGroup;
  fcOptions :string[] = ['word','phrase','sentence','general'];
  
  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    private matDialogRef: MatDialog
  ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content:['',[Validators.required,Validators.minLength(2)]],
      type:['',[Validators.required]],
      explanation:['',[Validators.required,Validators.minLength(10)]]
    })
  }

  submit(){
      if (this.form.valid) {
        this.userID$.pipe(take(1)).subscribe((userID) => {
          if (userID) {
            this.store.dispatch(CreateAFlashcard({ id:userID, formData:this.form.getRawValue() }));
          }
      })
    }

    this.matDialogRef.closeAll();
  }

}
