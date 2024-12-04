import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { StudyResource } from '../../../models/studyResource';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { LoadMyStudyResources, SearchItems } from '../../../store/actions/studyResource.actions';
import { SelectMyStudyResourcesFeature } from '../../../store/selectors/studyResource.selector';
import { MatDialog } from '@angular/material/dialog';
import { CreateAStudyResourceDialogComponent } from '../create-astudy-resource-dialog/create-astudy-resource-dialog.component';

@Component({
  selector: 'app-my-study-resources-page',
  templateUrl: './my-study-resources-page.component.html',
  styleUrl: './my-study-resources-page.component.scss'
})
export class MyStudyResourcesPageComponent implements OnInit {


  studyResourcesList$ : Observable<StudyResource[] | null>
  UserID$ : Observable<number | undefined>;
  
  constructor(
    private store:Store<AppState>,
    private matDialogRef:MatDialog
  )
  {

    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadMyStudyResources({id:userID}));
        this.studyResourcesList$ = this.store.select(SelectMyStudyResourcesFeature);
      }
  })
    
  }
  
  ngOnInit(): void {
  }

  openDialog(){
    this.matDialogRef.open(CreateAStudyResourceDialogComponent);
  }



}
