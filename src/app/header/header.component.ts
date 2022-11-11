import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginFlag: boolean = true;
  buttonFlag: boolean = false;
  constructor(private router: Router, public authenticate:AuthenticationService ,private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.buttonFlag=this.authenticate.isUserLoggedIn();
  }

  navigatetoLogin(){
   this.router.navigateByUrl("/login");
  this.loginFlag = false;
  }
  navigatetoLogOut(){
    this.router.navigateByUrl("/home");
    this.authentication.logout();
  }
  navigatetoHome(){
    this.router.navigateByUrl("/home");
  }

}
