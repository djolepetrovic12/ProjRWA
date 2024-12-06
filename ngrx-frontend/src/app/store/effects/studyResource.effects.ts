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
  SearchProfessors, 
  SearchProfessorsFailure, 
  SearchProfessorsSuccess, 
  UpdateMyStudyResource, 
  UpdateMyStudyResourceFailure, 
  UpdateMyStudyResourceSuccess
 } from "../actions/studyResource.actions";
import { StudyResourceService } from "../../services/StudyResource/study-resource.service";
import { StudyResource } from "../../models/studyResource";
import { HttpResponse } from "@angular/common/http";



@Injectable()
export class StudyResourceEffects {
  constructor(
    private actions$: Actions,
    private studyResourceService : StudyResourceService,
  ) {}

  
        createAStudyResource$ = createEffect(() => 
          this.actions$.pipe(
            ofType(CreateAStudyResource),
            switchMap(({id,formData}) => 
              this.studyResourceService.createAStudyResource(id,formData).pipe(
                map((response) => { return CreateAStudyResourceSuccess({studyResource:<StudyResource>response}) }),
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
                  map((response) => {  return LoadStudyResourcesSuccess({studyResources:<StudyResource[]>response}) }),
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
                        map((response) => {return DeleteMyStudyResourceSuccess({id:<number>response})}),
                        catchError((error) => {return of(DeleteMyStudyResourceFailure({error:error }))})
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
                              map((response) =>  {return LoadStudyResourcesSuccess({studyResources:<StudyResource[]>response}) } ),
                              catchError((error) => {return of(LoadStudyResourcesFailure({ error:error }))})
                            )
                          )
                          )
                        )
                    
                        searchProfessors$ = createEffect(() => 
                          this.actions$.pipe(
                            ofType(SearchProfessors),
                            switchMap(({query}) => 
                              this.studyResourceService.searchProfessors(query).pipe(
                                map((response) =>  {return SearchProfessorsSuccess({professors:<User[]>response}) } ),
                                catchError((error) => {return of(SearchProfessorsFailure({ error:error }))})
                              )
                            )
                            )
                          )
                        


}
