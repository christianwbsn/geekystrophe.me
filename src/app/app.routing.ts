import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleComponent } from './article/article.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { PostComponent } from './post/post.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomeComponent },
    { path: 'profile',     component: ProfileComponent },
    { path: 'project/:name',    component: ProjectComponent },
    { path: 'article',          component: ArticleComponent },
    { path: 'article/:id',      component: PostComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
