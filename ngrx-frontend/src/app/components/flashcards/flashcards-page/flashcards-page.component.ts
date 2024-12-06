import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { map, Observable, take } from 'rxjs';
import { FCTypes, Flashcard } from '../../../models/flashcard';
import { SelectFlashcardsFeature } from '../../../store/selectors/flashcard.selector';
import { LoadFlashcards } from '../../../store/actions/flashcard.actions';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { AddFlashcardDialogComponent } from '../add-flashcard-dialog/add-flashcard-dialog.component';

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrl: './flashcards-page.component.scss'
})
export class FlashcardsPageComponent implements OnInit {
  
  flashcardsList$ : Observable<Flashcard[] | null>;
  UserID$ : Observable<number | undefined>;

  typeWordFlashcards$: Observable<Flashcard[]>;
  typePhraseFlashcards$: Observable<Flashcard[]>;
  typeSentenceFlashcards$: Observable<Flashcard[]>;
  typeGeneralFlashcards$: Observable<Flashcard[]>;
  
  constructor(
    private store:Store<AppState>,
    private matDialogRef: MatDialog
  ){
    this.flashcardsList$ = this.store.select(SelectFlashcardsFeature);
  }
  
  ngOnInit(): void {
    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadFlashcards({ id:userID}));
      }
  })

  this.typeWordFlashcards$ = this.flashcardsList$.pipe(
    map((flashcards) => flashcards?.filter((card) => card.type === FCTypes.Word) || [])
  );

  this.typePhraseFlashcards$ = this.flashcardsList$.pipe(
    map((flashcards) => flashcards?.filter((card) => card.type === FCTypes.Phrase) || [])
  );

  this.typeSentenceFlashcards$ = this.flashcardsList$.pipe(
    map((flashcards) => flashcards?.filter((card) => card.type === FCTypes.Sentence) || [])
  );

  this.typeGeneralFlashcards$ = this.flashcardsList$.pipe(
    map((flashcards) => flashcards?.filter((card) => card.type === FCTypes.General) || [])
  );


  }

  openDialog()
  {
    this.matDialogRef.open(AddFlashcardDialogComponent);
  }

}
