import { Component, Input } from '@angular/core';
import { StudyResource } from '../../../models/studyResource';
import { MatDialog } from '@angular/material/dialog';
import { StudyResourceDialogComponent } from '../study-resource-dialog/study-resource-dialog.component';

@Component({
  selector: 'app-study-resource',
  templateUrl: './study-resource.component.html',
  styleUrl: './study-resource.component.scss'
})
export class StudyResourceComponent {
  
  @Input()
  studyResourceInfo: StudyResource
  
  constructor(
    private matDialogRef:MatDialog
  ){}
  
  onclick() {
  this.matDialogRef.open(StudyResourceDialogComponent,{data:this.studyResourceInfo})
  }


}
