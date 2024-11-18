import { Component, Input } from '@angular/core';
import { Flashcard } from '../../../models/flashcard';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { DeleteAFlashcard, UpdateAFlashcard } from '../../../store/actions/flashcard.actions';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFlashcardDialogComponent } from '../update-flashcard-dialog/update-flashcard-dialog.component';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent {

  constructor(
    private store:Store<AppState>,
    private matDialogRef:MatDialog
    ){}

  @Input() flashcardInfo: Flashcard;



  edit(){
    this.matDialogRef.open(UpdateFlashcardDialogComponent,{data: this.flashcardInfo});
  }

  delete(){
    this.store.dispatch(DeleteAFlashcard({id:this.flashcardInfo.id}));
  }

}
