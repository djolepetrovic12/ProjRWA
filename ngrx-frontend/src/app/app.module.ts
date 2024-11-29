import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReducer } from './store/reducers/user.reducer';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { FlashcardsPageComponent } from './components/flashcards/flashcards-page/flashcards-page.component';
import { FlashcardComponent } from './components/flashcards/flashcard/flashcard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddFlashcardDialogComponent } from './components/flashcards/add-flashcard-dialog/add-flashcard-dialog.component';
import { MatSelectModule } from '@angular/material/select'; 
import { FlashcardReducer } from './store/reducers/flashcard.reducer';
import { UpdateFlashcardDialogComponent } from './components/flashcards/update-flashcard-dialog/update-flashcard-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { StudyResourceReducer } from './store/reducers/studyResource.reducer';
import { StudyResourcesPageComponent } from './components/studyResource/study-resources-page/study-resources-page.component';
import { CreateAStudyResourceDialogComponent } from './components/studyResource/create-astudy-resource-dialog/create-astudy-resource-dialog.component';
import { StudyResourceComponent } from './components/studyResource/study-resource/study-resource.component';
import { StudyResourceDialogComponent } from './components/studyResource/study-resource-dialog/study-resource-dialog.component';
import { MyStudyResourcesPageComponent } from './components/studyResource/my-study-resources-page/my-study-resources-page.component';
import { MyStudyResourceTableComponent } from './components/studyResource/my-study-resource-table/my-study-resource-table.component';
import {MatTable, MatTableModule} from '@angular/material/table';
import { UpdateStudyResourceDialogComponent } from './components/studyResource/update-study-resource-dialog/update-study-resource-dialog.component';
import { CreateStudyResourceDialogComponent } from './components/studyResource/create-study-resource-dialog/create-study-resource-dialog.component';
import { CommentCardComponent } from './components/studyResource/comment-card/comment-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RoleGuard } from '../app/guards/roles.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainpageComponent,
    FlashcardsPageComponent,
    FlashcardComponent,
    AddFlashcardDialogComponent,
    UpdateFlashcardDialogComponent,
    StudyResourcesPageComponent,
    CreateAStudyResourceDialogComponent,
    StudyResourceComponent,
    StudyResourceDialogComponent,
    MyStudyResourcesPageComponent,
    MyStudyResourceTableComponent,
    UpdateStudyResourceDialogComponent,
    CreateStudyResourceDialogComponent,
    CommentCardComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatTableModule,
    MatTable,
    MatAutocompleteModule,
    StoreModule.forRoot<AppState>({ user: UserReducer, flashcards:FlashcardReducer, studyResources:StudyResourceReducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states in DevTools
      logOnly: true, // Restrict DevTools to log-only mode in production
    }),

  ],
  providers: [
    RoleGuard,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
