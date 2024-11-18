import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-study-resource-dialog',
  templateUrl: './study-resource-dialog.component.html',
  styleUrl: './study-resource-dialog.component.scss'
})
export class StudyResourceDialogComponent {

  constructor(
    private matDialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


  download()
  {
    this.matDialogRef.closeAll();
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
