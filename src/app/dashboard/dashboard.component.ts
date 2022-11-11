import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showModal : boolean = false;
  showDeleteModal:boolean = false;
  closeResult: string = '';
  tagclose:boolean = true;
  tagclosedelete:boolean = true;
  user: any;
  message: any;
  CourseData: any;
  coursename: any;
  addform: FormGroup;
  searchForm:FormGroup;
  submitted:boolean = false;
  addCourse: any;
  addedDetailedCourse: any;
  deletecourseId: any;
  deleteitemcourse: any;
  searchCourse: any;
  searchData: any;
  filtercourse:boolean = false;
  showNotResultFound: boolean = false;

  constructor(private UserService:UserserviceService ,private fb: FormBuilder , public _snackBar: MatSnackBar) { 
    this.addform = this.fb.group({
      courseName: ['', Validators.required],
      technology: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      duration:['',Validators.required]
    });
    this.searchForm = this.fb.group({
      search: ['', ],
    })
  }

  ngOnInit(): void {
    this.getCouseDetails();
  }
  addItem(){
    this.showModal =true;
  }
  closeModel(){
    this.tagclose = false;
  }
  DeleteItem(event :any,indexvalue :any){
    this.showDeleteModal =true;
    this.deletecourseId = indexvalue;    
  }
  checkDelete(){
    this.deletecourseId ;
    this.deleteitemcourse = {
      "DeleteById": this.deletecourseId,
    }
    console.log( this.deletecourseId,"checkId")
    this.UserService.deleteItems(this.deleteitemcourse).subscribe((resp: any) => {
      this.addedDetailedCourse = resp;
      console.log( this.addedDetailedCourse);
      if(this.addedDetailedCourse!= null){
        console.log("hii")
         this._snackBar.open('Course deleted successfully','',{ 
          panelClass: 'snackbar',
           duration: 1000,
        });
        this.tagclosedelete = false;
        this.getCouseDetails();
        console.log(this.filtercourse,"---->>>>");
        this.filtercourse=false;
        //this.search();
      }
    })
  }
  closedeleteModel(){
    this.tagclosedelete = false;
  }
  getCouseDetails(){
    this.UserService.getCourse(this.user).subscribe((resp: any) => {
      console.log(resp);
      this.CourseData = resp;
      console.log(this.CourseData,"***")
      this.coursename = this.CourseData.Java;
    });
  }
  adedItems(){
    this.submitted = true;
    this.addCourse = {
      "coursename": this.addform.controls.courseName.value,
      "description": this.addform.controls.description.value,
      "duration":this.addform.controls.duration.value,
      "technology":this.addform.controls.technology.value,
      "url":this.addform.controls.url.value
    }
    this.UserService.AddcourseItem(this.addCourse).subscribe((resp: any) => {
      this.addedDetailedCourse = resp;
      console.log( this.addedDetailedCourse);
      if(this.addedDetailedCourse!= null){
        console.log("hii")
         this._snackBar.open('Course added successfully','',{ 
          panelClass: 'snackbar',
           duration: 4000,
        });
        this.tagclose = false;
        this.getCouseDetails();
        this.search();
      }
    })
  }

  search(){
    this.searchCourse = this.searchForm.controls.search.value;
    this.UserService.getSearchAdminItem(this.searchCourse).subscribe((resp: any) => {
      //console.log(resp);
      this.searchData = resp;
      if(this.searchData!=null ){
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

