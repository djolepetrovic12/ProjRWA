import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { CreateAStudyResource } from '../../../store/actions/studyResource.actions';

@Component({
  selector: 'app-create-astudy-resource-dialog',
  templateUrl: './create-astudy-resource-dialog.component.html',
  styleUrl: './create-astudy-resource-dialog.component.scss'
})
export class CreateAStudyResourceDialogComponent implements OnInit {

  userID$: Observable<number | undefined> = this.store.select(SelectUserIDFeature);
  form: FormGroup;
  selectedFile: File | null = null;
  
  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    private matDialogRef: MatDialog
  ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:['',[Validators.required,Validators.minLength(3)]],
      description:['',[Validators.required,Validators.minLength(3)]],
      file:['']
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      if (this.selectedFile.type !== 'application/pdf') {
        alert('Only PDF files are allowed!');
        return;
      }

    }

  }

  submit(){
    this.userID$.pipe(take(1)).subscribe((userID) => {
      if (this.form.valid && userID && this.selectedFile) {
        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('file', this.selectedFile);
        formData.append('resourceLink', String(new Date() + String(Math.random()*1e6)));
        console.log("zdravo ja sam create resource dijalog");
        this.store.dispatch(CreateAStudyResource({id:userID,formData:formData}));
      }
    });
    this.matDialogRef.closeAll();

  }

}
