import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SelectAllUsersFeature, SelectUserIDFeature, SelectUserRoleFeature } from '../../store/selectors/user.selector';
import { DeleteUser, LoadAllUsers, UpdateUser } from '../../store/actions/user.action';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
 
  UserID$ : Observable<number | undefined>;
  users$: Observable<User[]> = this.store.select(SelectAllUsersFeature);
  displayedColumns: string[] = ['name', 'surname', 'role', 'username', 'email','actions']; // Columns to display
  dataSource = new MatTableDataSource<User>([]); // Data source
  userRole$: Observable<string | undefined> = this.store.select(SelectUserRoleFeature);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store:Store<AppState>,private matDialogRef:MatDialog)
  {
    this.UserID$ = this.store.select(SelectUserIDFeature);

    this.UserID$.pipe(take(1)).subscribe((userID) => {
      if (userID) {
        this.store.dispatch(LoadAllUsers({userID}));
      }
    });
  }

  ngOnInit(): void {
    this.users$.subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Attach paginator
    this.dataSource.sort = this.sort; // Attach sort
  }

  // Example action methods
  edit(user: User): void {
    this.userRole$.pipe(take(1)).subscribe((role) => {
      if (role === 'ADMIN') {
        this.matDialogRef.open(UpdateUserDialogComponent,{data: user});
      }
      else
      {
        alert('You do not have the admin permissions necessary to delete accounts');
      }
    });
  }

  delete(user: User): void {
    this.userRole$.pipe(take(1)).subscribe((role) => {
      if (role === 'ADMIN') {
        this.store.dispatch(DeleteUser({id:user.id}));
      }
      else
      {
        alert('You do not have the admin permissions necessary to delete accounts');
      }
    });
  }

}
