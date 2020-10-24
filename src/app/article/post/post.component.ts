import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../post.service';
import { ConditionalExpr } from '@angular/compiler';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [PostService]
})
export class PostComponent implements OnInit {

    public loading = true
    posts: Post[] =[];
    post : Post;
    shareDescription = "Read this well-written article. Hope you enjoy it"

    constructor(
        private route: ActivatedRoute,
        private p: PostService,
    ) { 
        function strip_html_tags(str)
        {
           if ((str===null) || (str===''))
               return false;
          else
               str = str.toString();
          return str.replace(/<[^>]*>/g, '');
        }

        function remove_medium_img(str) {
            let div = document.createElement('div');
            div.innerHTML = str
            let elements = div.getElementsByTagName('img')
            elements[elements.length-1].parentNode.removeChild(elements[elements.length-1])
            return div.innerHTML
        }

        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            //Post
            var post_id = params['id']
            this.p.getAll().subscribe(
                r => {
                    this.loading = false;
                    this.posts = r.items;
                    this.posts.forEach(post => {
                        let myString = strip_html_tags(post.description)
                        let averageWPM = 225
                        let seo_route = post.title.replace(/[\W_]+/g, "-").toLowerCase() + '-'
                        post['id'] = seo_route + post.guid.replace("https://medium.com/p/","")
                        post['content'] = remove_medium_img(post.content)
                        post['est_reading_time'] = Math.ceil(myString.split(" ").length / averageWPM)
                    })
                    this.post = this.posts.find(function(element) {
                        return element.id == post_id
                    })
                },
                error => {
                    this.loading = false
                    console.error('Error: ' + error)
                }
            );
        });
    }

    ngOnInit() {
    }
}

export interface Post {
    id:string;
    title:string;
    author:string;
    pubDate:string;
    link:string;
    guid:string;
    thumbnail:string;
    description:string;
    content:string;
    enclosure:string;
    categories:string[];
    est_reading_time:number;
}