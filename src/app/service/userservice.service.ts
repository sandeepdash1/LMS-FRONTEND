import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // private baseUrl = 'http://localhost:8081/lms/register/signup';
 // private loginbaseUrl = http://localhost:8081/lms/register/signin
 
 //**   This is only json call, while making chnages change it to server call */
   private baseUrl = 'http://localhost:8989/api/registration-service/lms/register/signup'; 
   private loginbaseUrl ='http://localhost:8989/api/registration-service/lms/register/signin';
   private OtpValidurl = 'http://localhost:8989/api/registration-service/lms/register/otp';
   private successValidurl = 'http://localhost:8989/api/registration-service/lms/register/validateotp';
   private getCourseUrl = 'http://localhost:8989/api/courses-service/lms/course/allcourses';
   private addDetails  = 'http://localhost:8989/api/courses-service/lms/course/addcourse';
   private deleteItem = 'http://localhost:8989/api/courses-service/lms/course/deletecourses';
   private searchItem = 'http://localhost:8989/api/courses-service/lms/course/gettechnology';
   private searchCourseByname = 'http://localhost:8989/api/courses-service/lms/course/getcourses?coursename'

  constructor(private httpClient: HttpClient) { }
  register(usersignup: any) {
    return this.httpClient.post(`${this.baseUrl}`, usersignup);
}
login(login: any):Observable<any> {
  return this.httpClient.post(`${this.loginbaseUrl}`, login); //change thios to post 
}
getOtp(otp: any) {
  return this.httpClient.post(`${this.OtpValidurl}`, otp); //change thios to post 
}
successOtp(validateOtp: any) {
  return this.httpClient.post(`${this.successValidurl}`, validateOtp); //change thios to post 
}
getCourse(usersignup: any) {
  let header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("jwt") ||'')
    .set('Access-Control-Allow-Origin','*');
    console.log(header,"header");
    let params = new HttpParams().set('usersignup', usersignup);
    console.log(params,"params");
  return this.httpClient.get(`${this.getCourseUrl}`, { headers: header, params: params });  
}
AddcourseItem(usersignup: any) {
  console.log(usersignup,"loginuser");
  let header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("jwt") ||'')
    .set('Access-Control-Allow-Origin','*');
  return this.httpClient.post(`${this.addDetails}`, usersignup,{headers:header}); //change thios to post 
}
deleteItems(usersignup: any) {
  console.log(usersignup.DeleteById,"deletenuser");
  let header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("jwt") ||'')
    .set('Access-Control-Allow-Origin','*');
  return this.httpClient.delete(`${this.deleteItem}/${usersignup.DeleteById}`,{headers:header}); //change thios to Delete 
}
getSearchItem(duration1:number,duration2 :number,technology :string) {
  console.log(duration1,duration2,technology,"deletenuser");
  let header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("jwt") ||'')
    .set('Access-Control-Allow-Origin','*');
 // return this.httpClient.get('http://localhost:8082/lms/course/gettechnology/duration1/duration2?technology=technology');
  return this.httpClient.get(`${this.searchItem}/${duration1}/${duration2}?technology=${technology}`,{headers:header}); //get search call ,while chnaging to server pass the parameter 
}
getSearchAdminItem(coursename :string) {
  let header = new HttpHeaders()
    .set('Content-type','application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("jwt") ||'')
    .set('Access-Control-Allow-Origin','*');
  return this.httpClient.get(`${this.searchCourseByname}=${coursename}`,{headers:header}); 
}
}
