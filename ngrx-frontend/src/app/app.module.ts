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
import { FlashcardsPageComponent } from './components/flashcards-page/flashcards-page.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddFlashcardDialogComponent } from './components/add-flashcard-dialog/add-flashcard-dialog.component';
import { MatSelectModule } from '@angular/material/select'; 
import { FlashcardReducer } from './store/reducers/flashcard.reducer';

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
    AddFlashcardDialogComponent
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
    StoreModule.forRoot<AppState>({ user: UserReducer, flashcards:FlashcardReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states in DevTools
      logOnly: true, // Restrict DevTools to log-only mode in production
    }),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
