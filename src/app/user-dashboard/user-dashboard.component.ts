import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserserviceService } from '../service/userservice.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  title = 'appBootstrap';
  showModal : boolean = false;
  closeResult: string = '';
  tagclose:boolean = true;
  user: any;
  CourseData: any;
  coursename: any;
  searchForm: FormGroup;
  searchCourse: any;
  duration1: any;
  duration2: any;
  technology: any;
  searchData: any;
  filtercourse: boolean = false;
  constructor(private modalService: NgbModal , private UserService:UserserviceService , private fb: FormBuilder, public _snackBar: MatSnackBar) {
    this.searchForm = this.fb.group({
      search: ['', ],
    })
   }

  ngOnInit(): void {
    this.getCouseDetails();
  }
  
  getCouseDetails(){
    this.UserService.getCourse(this.user).subscribe((resp: any) => {
      console.log(resp);
      this.CourseData = resp;
      this.coursename = this.CourseData.Java;
    });
   
  
}
search(){
    this.searchCourse = this.searchForm.controls.search.value;  
    var splitted = this.searchCourse.split(",", 3); 
    console.log(splitted.length) 
    for(var i =0; i< splitted.length ;i++){
      var duration1 = splitted[0];
       var duration2 = splitted[1];
      var technology = splitted[2];
     
    }
    this.UserService.getSearchItem(duration1,duration2,technology).subscribe((resp: any) => {
      console.log(resp);
      this.searchData = resp;
      if(this.searchData!=null && splitted.length==3 ){
        this.filtercourse = true;
        
      }else{
        //console.log( resp.message)
        console.log( this.filtercourse)
        this._snackBar.open('No Course Found!!','',{ 
          panelClass: 'snackbar',
           duration: 2000,
        });
        this.filtercourse = false;
      }
    });
}
}
