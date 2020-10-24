import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewEncapsulation
} from '@angular/core';
import {
    PostService
} from '../post.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    providers: [PostService],
    encapsulation: ViewEncapsulation.Emulated
})

export class ArticleComponent implements OnInit {

    public loading = true;
    posts :Article[] = [];
    order = 'pubDate';
    header = '';
    term =''
    subtitle=''
    page: number = 1;

    constructor(private p: PostService,
        private ref: ChangeDetectorRef, private router : Router) {
        function strip_html_tags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();
            return str.replace(/<[^>]*>/g, '');
        }

        function remove_img(str) {
            let div = document.createElement('div');
            div.innerHTML = str
            let elements = div.getElementsByTagName('img')
            while (elements[0]) {
                elements[0].parentNode.removeChild(elements[0])
            }
            return div.innerHTML
        }

        this.p.getAll().subscribe(
            result => {
                this.loading = false
                this.posts = result.items
                this.header = result.feed.description;
                this.posts.forEach(post => {
                    post['subtitle'] = strip_html_tags(post.description.slice(0, post.description.indexOf('</h4>')))
                    if (post.subtitle.length > 100) {
                        post.subtitle = ""
                    }
                    let myString = remove_img(post.description.slice(post.description.indexOf('</h4>') + 5))
                    let maxLength = 1000
                    let averageWPM = 225

                    let trimmedString = myString.substr(0, maxLength)
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    post.description = trimmedString + "..."

                    let seo_route = post.title.replace(/[\W_]+/g, "-").toLowerCase() + '-'
                    post['id'] = seo_route + post.guid.replace("https://medium.com/p/", "")
                    post['est_reading_time'] = Math.ceil(myString.split(" ").length / averageWPM)
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
export interface Article {
    title:string;
    author:string;
    pubDate:string;
    link:string;
    guid:string;
    thumbnail:string;
    subtitle:string;
    description:string;
    content:string;
    enclosure:string;
    categories:string[];
    est_reading_time:number;
}