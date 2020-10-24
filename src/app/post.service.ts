import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

    endpoint = "https://medium.com/feed/@christianwbsn"


  constructor(private http: Http) { }
    getAll() {
        return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURI(this.endpoint))
                .map(response => response.json());
    }


    // getPost(id) {
    //     return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURI(this.endpoint))
    //             .map(response => response.json());
    // }
}
