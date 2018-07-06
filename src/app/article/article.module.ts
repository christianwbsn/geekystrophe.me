import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { ArticleRoutingModule } from './article.routing';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';

import { ComponentsModule } from '../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { LoadingModule } from 'ngx-loading';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { PostComponent } from './post/post.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        ArticleRoutingModule,
        ComponentsModule,
        HttpClientModule,
        NgxPaginationModule,
        MomentModule,
        Ng2SearchPipeModule,
        OrderModule,
        LoadingModule,
        ShareButtonsModule.forRoot(),
    ],
    declarations: [
         ArticleComponent,
         PostComponent 
    ],
    exports:[ ArticleComponent ],
    providers: []
})
export class ArticleModule { }