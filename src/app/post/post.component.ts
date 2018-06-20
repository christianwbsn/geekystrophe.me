import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [PostService]
})
export class PostComponent implements OnInit {

    public loading = true
    posts=[];
    post={};
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
                        let averageWPM = 265
                        let seo_route = post.title.replace(/[\W_]+/g, "-").toLowerCase() + '-'
                        post['id'] = seo_route + post.guid.replace("https://medium.com/p/","")
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
    id: number;
    title: string;
    body: string;
}