import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewEncapsulation
} from '@angular/core';
import {
    PostService
} from '../post.service';

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
    order = 'pubDate';
    header = '';
    page: number = 1;

    constructor(private p: PostService,
        private ref: ChangeDetectorRef) {
        function strip_html_tags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();
            return str.replace(/<[^>]*>/g, '');
        }

        this.p.getAll().subscribe(
            result => {
                this.loading = false
                this.posts = result.items
                this.header = result.feed.description;
                this.posts.forEach(post => {
                    let myString = strip_html_tags(post.description)
                    let maxLength = 150
                    let averageWPM = 265

                    let trimmedString = myString.substr(0, maxLength)
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    post.description = trimmedString + "..."

                    let seo_route = post.title.replace(/[\W_]+/g, "-").toLowerCase() + '-'
                    post['id'] = seo_route + post.guid.replace("https://medium.com/p/", "")
                    post['est_reading_time'] = Math.ceil(myString.split(" ").length / averageWPM)
                    console.log(post.est_reading_time)
                    this.ref.detectChanges()
                })
            },
            error => {
                this.loading = false
                console.error('Error: ')
            }
        );
    }

    isFoundArticle() {
        if (this.posts.length == 0) {
            return false
        } else {
            return true
        }
    }
    ngOnInit() {
        this.isFoundArticle();
    }

}