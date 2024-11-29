import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { FlashcardComponent } from './components/flashcards/flashcard/flashcard.component';
import { FlashcardsPageComponent } from './components/flashcards/flashcards-page/flashcards-page.component';
import { StudyResourcesPageComponent } from './components/studyResource/study-resources-page/study-resources-page.component';
import { MyStudyResourcesPageComponent } from './components/studyResource/my-study-resources-page/my-study-resources-page.component';
import { RoleGuard } from './guards/roles.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['ADMIN', 'PROFESSOR', 'STUDENT']
    }
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'mainpage', 
    component:MainpageComponent
  },
  {
    path:'flashcards',
    component:FlashcardsPageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['PROFESSOR', 'STUDENT']
    }
  },
  {
    path:'studyResources',
    component:StudyResourcesPageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['ADMIN', 'PROFESSOR', 'STUDENT']
    }
  },
  {
    path:'myStudyResources',
    component:MyStudyResourcesPageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['PROFESSOR']
    }
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
