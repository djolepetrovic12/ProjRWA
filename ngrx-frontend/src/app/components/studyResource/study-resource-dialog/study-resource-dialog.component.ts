import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable, take } from 'rxjs';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { CreateAComment } from '../../../store/actions/comment.actions';
import { DownloadStudyResources } from '../../../store/actions/studyResource.actions';

@Component({
  selector: 'app-study-resource-dialog',
  templateUrl: './study-resource-dialog.component.html',
  styleUrl: './study-resource-dialog.component.scss'
})
export class StudyResourceDialogComponent implements OnInit {

  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);
 

  constructor(
    private store:Store<AppState>,
    private matDialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


  ngOnInit(): void {
   
    const textarea = document.querySelector('.comment-input');

  // Auto-resize the textarea height
  if(textarea)
    textarea.addEventListener('input', (event ) => {
      const target = event.target as HTMLTextAreaElement; // Type assertion
      target.style.height = 'auto'; // Reset the height
      target.style.height = `${target.scrollHeight}px`;
    });
      
    }


  addComment() {
    this.userID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(CreateAComment({userID,resourceID:this.data.id,content: this.getText()}));
      }
      else
      {
        alert("hey, you don't have permission to do that!");
      }
    });
  }

  getText() {
    const textarea = document.getElementById('myTextarea') as HTMLTextAreaElement;
      const text = textarea.value;
      return text;
  }


  download()
  {
    //console.log(this.data.id);
    this.store.dispatch(DownloadStudyResources({resourceID: this.data.id}))
    //this.matDialogRef.closeAll();
  }

  get getDateUploaded() : string
  {
    const dateUp = new Date(this.data.dateUploaded);
    const year = dateUp.getFullYear();
    const month = dateUp.getMonth() + 1;
    const day = dateUp.getDate();


    return `${day}/${month}/${year}`;
  }

}
