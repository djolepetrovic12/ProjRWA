import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { StudyResource } from '../../../models/studyResource';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { SelectStudyResourcesFeature } from '../../../store/selectors/studyResource.selector';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { LoadStudyResources } from '../../../store/actions/studyResource.actions';

@Component({
  selector: 'app-study-resources-page',
  templateUrl: './study-resources-page.component.html',
  styleUrl: './study-resources-page.component.scss'
})
export class StudyResourcesPageComponent implements OnInit{
  
  studyResourcesList$ : Observable<StudyResource[] | null>
  UserID$ : Observable<number | undefined>;

  constructor
  (
    private store:Store<AppState>,
    private matDialogRef: MatDialog
  ){
    this.studyResourcesList$ = this.store.select(SelectStudyResourcesFeature);
  }
  
  ngOnInit(): void {

    //this.studyResourcesList$.subscribe((sr) => {console.log(sr);})
    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadStudyResources());
      }
  })

  }

  openDialog()
  {
    //this.matDialogRef.open(AddFlashcardDialogComponent);
  }

}
