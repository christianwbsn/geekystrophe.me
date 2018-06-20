import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'; 

import { HomeModule } from './home/home.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { PostComponent } from './post/post.component';
import { LoadingModule } from 'ngx-loading';
import { ShareButtonsModule } from 'ngx-sharebuttons';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ArticleComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    HttpModule,
    NgxPaginationModule,
    MomentModule,
    Ng2SearchPipeModule,
    OrderModule,
    LoadingModule,
    ShareButtonsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
