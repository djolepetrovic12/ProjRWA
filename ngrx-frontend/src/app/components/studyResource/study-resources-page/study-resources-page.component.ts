import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, filter, map, merge, Observable, take, withLatestFrom } from 'rxjs';
import { StudyResource } from '../../../models/studyResource';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { SelectStudyResourcesFeature } from '../../../store/selectors/studyResource.selector';
import { SelectUserIDFeature } from '../../../store/selectors/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { LoadStudyResources, SearchItems, SearchProfessors } from '../../../store/actions/studyResource.actions';
import { FormControl } from '@angular/forms';
import { User } from '../../../models/user';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserService } from '../../../services/User/user-service.service';
import { StudyResourceService } from '../../../services/StudyResource/study-resource.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-study-resources-page',
  templateUrl: './study-resources-page.component.html',
  styleUrl: './study-resources-page.component.scss'
})
export class StudyResourcesPageComponent implements OnInit{

  professorsList$ : User[] = [];
  searchControl = new FormControl('');
  searchProfsControl = new FormControl('');
  studyResourcesList$ : Observable<StudyResource[] | null>
  UserID$ : Observable<number | undefined>;
  
  private selectedProfessorsSubject = new BehaviorSubject<User[]>([]);
  selectedProfessors$ = this.selectedProfessorsSubject.asObservable();

  constructor
  (
    private studyResourceService: StudyResourceService,
    private store:Store<AppState>,
    private matDialogRef: MatDialog
  ){
    this.store.dispatch(LoadStudyResources());
    this.studyResourcesList$ = this.store.select(SelectStudyResourcesFeature);


    this.searchProfsControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((query) => (query as string).length > 3)
    )
    .subscribe((query) => {
      if(query)
        this.studyResourceService.searchProfessors(query)
      .subscribe(
        (response) => {
          this.professorsList$ = <User[]>response;
        },
        (error) => {
          console.error('Error fetching professors:', error);
        }
        
      )
    });


  }
  
  ngOnInit(): void {

    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadStudyResources());
      }
  })

  combineLatest([
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ),
    this.selectedProfessors$
  ])
  .subscribe(([query, users]) => {
    const selectedIds = users.map((user) => user.id);

    if (query && (query as string).length > 3) {
      this.store.dispatch(
        SearchItems({
          query,
          professorIDs: selectedIds ?? [],
        })
      );
    } else {
      this.store.dispatch(LoadStudyResources());
    }




  });







  }


  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    //console.log($event.option.value);
  }

  addUser(user: User) {
    const currentProfessors = this.selectedProfessorsSubject.getValue();

    const userExists = currentProfessors.some(professor => professor.id === user.id);

    if (!userExists) {
    const updatedProfessors = [...currentProfessors, user];
    this.selectedProfessorsSubject.next(updatedProfessors);
    }
  }

  removeUser(user: User) {
    const currentProfessors = this.selectedProfessorsSubject.getValue();
    const updatedProfessors = currentProfessors.filter(u => u.id !== user.id);
    this.selectedProfessorsSubject.next(updatedProfessors);
  }


}
