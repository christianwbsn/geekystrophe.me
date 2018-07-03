import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [ LoginService ]
})

export class HomeComponent implements OnInit {
    public user : User;
    model = {
        left: true,
        middle: false,
        right: false
    };
    
    constructor(private loginService : LoginService, private router : Router) { 
    }
    ngOnInit() {
    }
}
