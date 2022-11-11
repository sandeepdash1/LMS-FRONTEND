import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  authenticate(userName: string) {
    if (userName !== 'admin') {
      sessionStorage.setItem('userName',userName);
      sessionStorage.setItem('roles','user');
      return true;
    }else if(userName === 'admin') {
      sessionStorage.setItem('userName',userName);
      sessionStorage.setItem('roles','admin');
      return true;
    }
    return false;
  }
  isUserLoggedIn(): boolean{
    let user = sessionStorage.getItem('userName')
    return !(user === null);
  }
  logout(){
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('email');
  }
//   signUp(user: User) {
//     // console.log("inside signup"+user);
//   return user;
// }
}
