import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, take } from 'rxjs';
import { Flashcard } from '../../models/flashcard';
import { SelectFlashcardsFeature } from '../../store/selectors/flashcard.selector';
import { LoadFlashcards } from '../../store/actions/flashcard.actions';
import { SelectUserIDFeature } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrl: './flashcards-page.component.scss'
})
export class FlashcardsPageComponent implements OnInit {
  
  flashcardsList$ : Observable<Flashcard[] | null>;
  UserID$ : Observable<number | undefined>;
  
  constructor(private store:Store<AppState>){
    this.flashcardsList$ = this.store.select(SelectFlashcardsFeature);
  }
  
  ngOnInit(): void {
    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadFlashcards({ id:userID}));
      }
  })


    
  }

}
