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
        this.user = new User();
    }

    ngOnInit() {}
    validateLogin() {
        console.log(this.user.username + " " + this.user.password)
        if(this.user.username && this.user.password) {
            this.loginService.validateLogin(this.user).subscribe(result => {
            console.log('result is ', result);
            if(result['status'] === 'success') {
              this.router.navigate(['']);
            } else {
              alert('Wrong username password');
            }
             
          }, error => {
            console.log('error is ', error);
          });
        } else {
            alert('enter user name and password');
        }
      }
}
