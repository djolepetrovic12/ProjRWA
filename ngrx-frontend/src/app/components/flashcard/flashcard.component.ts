import { Component, Input } from '@angular/core';
import { Flashcard } from '../../models/flashcard';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { DeleteAFlashcard } from '../../store/actions/flashcard.actions';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent {

  constructor(private store:Store<AppState>){}

  @Input() flashcardInfo: Flashcard;



  edit(){

  }

  delete(){
    this.store.dispatch(DeleteAFlashcard({id:this.flashcardInfo.id}));
  }

}
