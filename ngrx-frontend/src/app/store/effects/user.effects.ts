import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { DeleteUser, DeleteUserFailure, DeleteUserSuccess, LoadAllUsers, LoadAllUsersFailure, LoadAllUsersSuccess, Login, LoginFailure, LoginSuccess, Logout, LogoutFailed, LogoutSuccess, Register, RegisterFailure, RegisterSuccess, RehydrateAuth, UpdateUser, UpdateUserFailure, UpdateUserSuccess } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { CreateAFlashcard, CreateAFlashcardFailure, CreateAFlashcardSuccess, DeleteAFlashcard, DeleteAFlashcardFailure, DeleteAFlashcardSuccess, LoadFlashcards, LoadFlashcardsFailure, LoadFlashcardsSuccess, UpdateAFlashcard, UpdateAFlashcardFailure, UpdateAFlashcardSuccess } from "../actions/flashcard.actions";
import { FlashcardService } from "../../services/Flashcard/flashcard.service";
import { Flashcard } from "../../models/flashcard";
import { 
  CreateAStudyResource, 
  CreateAStudyResourceFailure, 
  CreateAStudyResourceSuccess, 
  DeleteMyStudyResource, 
  DeleteMyStudyResourceFailure, 
  DeleteMyStudyResourceSuccess, 
  DownloadMyStudyResources, 
  DownloadMyStudyResourcesFailure, 
  DownloadMyStudyResourcesSuccess, 
  DownloadStudyResources, 
  DownloadStudyResourcesFailure, 
  DownloadStudyResourcesSuccess, 
  LoadMyStudyResources, 
  LoadMyStudyResourcesFailure, 
  LoadMyStudyResourcesSuccess, 
  LoadStudyResources, 
  LoadStudyResourcesFailure, 
  LoadStudyResourcesSuccess, 
  SearchItems, 
  SearchItemsFailure, 
  SearchItemsSuccess, 
  SearchProfessors, 
  SearchProfessorsFailure, 
  SearchProfessorsSuccess, 
  UpdateMyStudyResource, 
  UpdateMyStudyResourceFailure, 
  UpdateMyStudyResourceSuccess
 } from "../actions/studyResource.actions";
import { StudyResourceService } from "../../services/StudyResource/study-resource.service";
import { StudyResource } from "../../models/studyResource";
import { CreateAComment, CreateACommentFailure, CreateACommentSuccess } from "../actions/comment.actions";
import { Comment } from "../../models/comment";
import { CommentService } from "../../services/Comment/comment.service";
import { HttpResponse } from "@angular/common/http";



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private flashcardService : FlashcardService,
    private studyResourceService : StudyResourceService,
    private commentService: CommentService,
    private router:Router,
    private readonly store:Store<AppState>
  ) {}

  rehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RehydrateAuth),
      switchMap(() =>
        this.userService.getCurrentUser().pipe(
          map(response => {this.router.navigate(['/']);return LoginSuccess({user:<User>response})}),
          catchError((error) => of(LoginFailure({ error })))
        )
      )
    )
  );

  user$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      switchMap(({ formData: formData }) =>
        this.userService.login(formData).pipe(
          map((response) => { this.router.navigate(['/']);return LoginSuccess({user:response})} ),
          catchError((error) => of(LoginFailure({ error:error })))
        )
      )
    )
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(Logout),
      tap(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.clear();
        }
      }),
      switchMap(() =>
        this.userService.logout().pipe(
          map((response:any) => { 
            if (response && response.message === 'logout successful') {
              this.router.navigate(['/login']);
              return LogoutSuccess({ message: response.message });
            } else {
              console.log("usao sam fail");
              throw new Error('Logout failed');
            }
          
          } ),
          catchError((error) => of(LogoutFailed({ error:error })))
        )
      )
    )
  );

  register$ = createEffect(() => 
    this.actions$.pipe(
      ofType(Register),
      switchMap(({ formData: formData }) =>
        this.userService.register(formData).pipe(
          map((response) => { this.router.navigate(['/login']);return RegisterSuccess({message:response})} ),
          catchError((error) => of(RegisterFailure({ error:error })))
        )
      )
    )
  );

  loadAllUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadAllUsers),
      switchMap(({userID}) => 
        this.userService.getAllUsers(userID).pipe(
          map((response) =>  LoadAllUsersSuccess({users:<User[]>response}) ),
          catchError((error) => of(LoadAllUsersFailure({ error:error })))
        )
      )
      )
    )

    deleteUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(DeleteUser),
        switchMap(({id}) => 
          this.userService.deleteUser(id).pipe(
            map((response) =>  DeleteUserSuccess({id: <number>response}) ),
            catchError((error) => of(DeleteUserFailure({ error:error })))
          )
        )
        )
      )

      updateUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UpdateUser),
          switchMap(({id,formData}) => 
            this.userService.updateUser(id,formData).pipe(
              map((response) =>  UpdateUserSuccess({user: <User>response})),
              catchError((error) => of(UpdateUserFailure({ error:error })))
            )
          )
          )
        )


  createAFlashcard$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CreateAFlashcard),
      switchMap(({id,formData}) => 
        this.flashcardService.createAFlashcard(id,formData).pipe(
          map((response) =>  CreateAFlashcardSuccess({flashcard:<Flashcard>response}) ),
          catchError((error) => of(CreateAFlashcardFailure({ error:error })))
        )
      )
      )
    )

    loadFlashcard$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LoadFlashcards),
        switchMap(({id:id}) => 
          this.flashcardService.loadFlashcards(id).pipe(
            map((response) =>  LoadFlashcardsSuccess({flashcards:response}) ),
            catchError((error) => of(LoadFlashcardsFailure({ error:error })))
          )
        )
        )
      )

      deleteAFlashcard$ = createEffect(() => 
        this.actions$.pipe(
          ofType(DeleteAFlashcard),
          switchMap(({id}) => 
            this.flashcardService.deleteAFlashcard(id).pipe(
              map((response) =>  DeleteAFlashcardSuccess({id:<number>response}) ),
              catchError((error) => of(DeleteAFlashcardFailure({ error:error })))
            )
          )
          )
        )

      updateAFlashcard$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UpdateAFlashcard),
          switchMap(({id,formData}) => 
            this.flashcardService.updateAFlashcard(id,formData).pipe(
              map((response) =>  UpdateAFlashcardSuccess({flashcard:<Flashcard>response}) ),
              catchError((error) => of(UpdateAFlashcardFailure({ error:error })))
            )
          )
          )
        )

        createAStudyResource$ = createEffect(() => 
          this.actions$.pipe(
            ofType(CreateAStudyResource),
            switchMap(({id,formData}) => 
              this.studyResourceService.createAStudyResource(id,formData).pipe(
                map((response) =>  CreateAStudyResourceSuccess({studyResource:<StudyResource>response}) ),
                catchError((error) => of(CreateAStudyResourceFailure({ error:error })))
              )
            )
            )
          )

          loadStudyResource$ = createEffect(() => 
            this.actions$.pipe(
              ofType(LoadStudyResources),
              switchMap(() => 
                this.studyResourceService.loadStudyResources().pipe(
                  map((response) =>  LoadStudyResourcesSuccess({studyResources:<StudyResource[]>response}) ),
                  catchError((error) => of(LoadStudyResourcesFailure({ error:error })))
                )
              )
              )
            )

            loadMyStudyResource$ = createEffect(() => 
              this.actions$.pipe(
                ofType(LoadMyStudyResources),
                switchMap(({id}) => 
                  this.studyResourceService.loadMyStudyResources(id).pipe(
                    map((response) =>  LoadMyStudyResourcesSuccess({studyResources:<StudyResource[]>response}) ),
                    catchError((error) => of(LoadMyStudyResourcesFailure({ error:error })))
                  )
                )
                )
              )

              updateMyStudyResource$ = createEffect(() => 
                this.actions$.pipe(
                  ofType(UpdateMyStudyResource),
                  switchMap(({id,formData}) => 
                    this.studyResourceService.updateMyStudyResource(id,formData).pipe(
                      map((response) =>  UpdateMyStudyResourceSuccess({studyResource:<StudyResource>response}) ),
                      catchError((error) => of(UpdateMyStudyResourceFailure({error:error })))
                    )
                  )
                  )
                )

                deleteMyStudyResource$ = createEffect(() => 
                  this.actions$.pipe(
                    ofType(DeleteMyStudyResource),
                    switchMap(({id}) => 
                      this.studyResourceService.deleteMyStudyResource(id).pipe(
                        map((response) => {console.log("hello") ;return DeleteMyStudyResourceSuccess({id:<number>response})}),
                        catchError((error) => {console.log("bad hello :(") ;return of(DeleteMyStudyResourceFailure({error:error }))})
                      )
                    )
                    )
                  )

                  createAComment$ = createEffect(() => 
                    this.actions$.pipe(
                      ofType(CreateAComment),
                      switchMap(({userID,resourceID,content}) => 
                        this.commentService.createAComment(userID,resourceID,content).pipe(
                          map((response) =>  CreateACommentSuccess({comment:<Comment>response}) ),
                          catchError((error) => of(CreateACommentFailure({ error:error })))
                        )
                      )
                      )
                    )

                    downloadStudyResource$ = createEffect(() => 
                      this.actions$.pipe(
                        ofType(DownloadStudyResources),
                        switchMap(({resourceID}) => 
                          this.studyResourceService.downloadMyStudyResource(resourceID).pipe(
                            map((response: HttpResponse<Blob>) =>{
                              const contentDisposition = response.headers.get('Content-Disposition');
                              console.log(contentDisposition);
                              const fileName = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'downloaded-file.pdf';
                              return DownloadStudyResourcesSuccess({resourceID,fileBlob:response.body!,fileName})}),
                            catchError((error) => of(DownloadStudyResourcesFailure({ error:error })))
                          )
                        )
                        )
                      )

                      downloadMyStudyResource$ = createEffect(() => 
                        this.actions$.pipe(
                          ofType(DownloadMyStudyResources),
                          switchMap(({resourceID}) => 
                            this.studyResourceService.downloadMyStudyResource(resourceID).pipe(
                              map((response: HttpResponse<Blob>) =>{
                                const contentDisposition = response.headers.get('Content-Disposition');
                                console.log(contentDisposition);
                                const fileName = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'downloaded-file.pdf';
                                return DownloadMyStudyResourcesSuccess({resourceID,fileBlob:response.body!,fileName})}),
                              catchError((error) => of(DownloadMyStudyResourcesFailure({ error:error })))
                            )
                          )
                          )
                        )


                      searchItems$ = createEffect(() => 
                        this.actions$.pipe(
                          ofType(SearchItems),
                          switchMap(({query,professorIDs}) => 
                            this.studyResourceService.searchMyStudyResources(query,professorIDs).pipe(
                              map((response) =>  {console.log(response) ;return LoadStudyResourcesSuccess({studyResources:<StudyResource[]>response}) } ),
                              catchError((error) => { console.log(error);return of(LoadStudyResourcesFailure({ error:error }))})
                            )
                          )
                          )
                        )
                    
                        searchProfessors$ = createEffect(() => 
                          this.actions$.pipe(
                            ofType(SearchProfessors),
                            switchMap(({query}) => 
                              this.studyResourceService.searchProfessors(query).pipe(
                                map((response) =>  {console.log(response) ;return SearchProfessorsSuccess({professors:<User[]>response}) } ),
                                catchError((error) => { console.log(error);return of(SearchProfessorsFailure({ error:error }))})
                              )
                            )
                            )
                          )
                        


}
