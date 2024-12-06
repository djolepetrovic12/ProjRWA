import { Component, Input } from '@angular/core';
import { StudyResource } from '../../../models/studyResource';
import { MatDialog } from '@angular/material/dialog';
import { StudyResourceDialogComponent } from '../study-resource-dialog/study-resource-dialog.component';
import { UpdateStudyResourceDialogComponent } from '../update-study-resource-dialog/update-study-resource-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { DeleteMyStudyResource } from '../../../store/actions/studyResource.actions';
import { Observable, take } from 'rxjs';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';

@Component({
  selector: 'app-study-resource',
  templateUrl: './study-resource.component.html',
  styleUrl: './study-resource.component.scss'
})
export class StudyResourceComponent {

  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);

  @Input()
  myResources: boolean = false;
  
  @Input()
  studyResourceInfo: StudyResource
  
  constructor(
    private matDialogRef:MatDialog,
    private store:Store<AppState>
  ){}
  
  onclick() {
  this.matDialogRef.open(StudyResourceDialogComponent,{width:'700px',data:this.studyResourceInfo})
  }

  delete() {
    this.userID$.pipe(take(1)).subscribe((userID) => {
      if (userID === this.studyResourceInfo.userID) {
        this.store.dispatch(DeleteMyStudyResource({id:this.studyResourceInfo.id}));
      }
      else
      {
        alert('You do not have permission to edit another person\'s studyResource');
        this.matDialogRef.closeAll();
      }
    });
  }


  edit() {
    this.matDialogRef.open(UpdateStudyResourceDialogComponent,{data: this.studyResourceInfo});
  }


}
