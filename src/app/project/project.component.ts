import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    public loading = true

    constructor(
        private route: ActivatedRoute,
    ) { 
        this.route.params.forEach((params: Params) => {
            let id = +params['name'];
            var post_id = params['name']
        });
    }

    ngOnInit() {
    }
}