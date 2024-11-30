import { Component, OnInit } from '@angular/core';
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

    /*this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Wait 300ms after the user stops typing
        distinctUntilChanged(), // Prevent duplicate queries
        filter((query) => (query as string).length > 3) // Only trigger for meaningful input
      )
      .subscribe((query) => {
        if(query)
        this.store.dispatch(SearchItems({ query })); // Dispatch the search action
      });*/

    this.searchProfsControl.valueChanges
    .pipe(
      debounceTime(500), // Wait 300ms after the user stops typing
      distinctUntilChanged(), // Prevent duplicate queries
      filter((query) => (query as string).length > 3) // Only trigger for meaningful input
    )
    .subscribe((query) => {
      if(query)
        this.studyResourceService.searchProfessors(query)
      .subscribe(
        (response) => {
          console.log('Professors:', response); // Debug log
          this.professorsList$ = <User[]>response; // Store the data in the array
          console.log(this.professorsList$);
        },
        (error) => {
          console.error('Error fetching professors:', error); // Handle errors
        }
        
      )
      //this.store.dispatch(SearchProfessors({ query })); // Dispatch the search action
    });

    this.selectedProfessors$.subscribe(users => {
      console.log('Selected professors:', users);
    });

  }
  
  ngOnInit(): void {

    //this.studyResourcesList$.subscribe((sr) => {console.log(sr);})
    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadStudyResources());
      }
  })


  /*this.searchControl.valueChanges
  .pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter((query) => (query as string).length > 3),
    withLatestFrom(this.selectedProfessors$) // Combine with the latest professors
  )*/
  combineLatest([
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((query) => (query as string).length > 3)
    ),
    this.selectedProfessors$ // Emits the latest professors
  ])
  .subscribe(([query, users]) => {
    const selectedIds = users.map((user) => user.id); // Extract IDs dynamically
    console.log('Search query:', query);
    console.log('Selected Professor IDs:', selectedIds);

    if(query)
    this.store.dispatch(
      SearchItems({
        query,
        professorIDs: selectedIds ?? [],
      })
    );
  });







  }

  openDialog()
  {
    //this.matDialogRef.open(AddFlashcardDialogComponent);
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    console.log($event.option.value);
  }

  addUser(user: User) {
    const currentProfessors = this.selectedProfessorsSubject.getValue(); // Get current array

    // Check if the user already exists in the list by comparing their id
    const userExists = currentProfessors.some(professor => professor.id === user.id);

    if (!userExists) {
    const updatedProfessors = [...currentProfessors, user]; // Add the new user
    this.selectedProfessorsSubject.next(updatedProfessors); // Emit updated array
    }
  }

  // Optional: Method to remove a user from the selected list
  removeUser(user: User) {
    const currentProfessors = this.selectedProfessorsSubject.getValue();
    const updatedProfessors = currentProfessors.filter(u => u.id !== user.id); // Remove by ID
    this.selectedProfessorsSubject.next(updatedProfessors); // Emit updated array
  }


}
