import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation  } from '@angular/core';
import { PostService } from '../post.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    providers: [PostService],
    encapsulation: ViewEncapsulation.Emulated
})

export class ArticleComponent implements OnInit {

  public loading = true;
  posts = [];
  order ='pubDate';
  page: number = 1;

  constructor(private p: PostService, 
    private ref : ChangeDetectorRef) {
    function strip_html_tags(str)
    {
       if ((str===null) || (str===''))
           return false;
      else
           str = str.toString();
      return str.replace(/<[^>]*>/g, '');
    }

      this.p.getAll().subscribe(
          result => {
              this.loading = false
              this.posts = result.items
              this.posts.forEach(post => {
                  let myString = strip_html_tags(post.description)
                  let maxLength = 160
                  
                  let trimmedString = myString.substr(0, maxLength)
                  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                  post.description = trimmedString + "..."

                  let seo_route = post.title.replace(/[\W_]+/g, "-").toLowerCase() + '-'
                  post['id'] = seo_route + post.guid.replace("https://medium.com/p/","")
                  this.ref.detectChanges() 
              })
          },
          error => {
            this.loading = false
            console.error('Error: ')
          } 
      );
  }

  ngOnInit() {
   }

}
