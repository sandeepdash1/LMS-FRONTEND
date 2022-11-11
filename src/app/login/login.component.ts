import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  loginOtp: FormGroup;
  submitted: boolean = false;
  submittedotp: boolean = false;
  logoutFlag: boolean = false;
  loginrole: any;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  user: any;
  tagcloseotp: boolean = true;
  showDeleteModal: boolean = false;
  message: any;
  userOTP: any;
  OTPmessage: any;
  showvalidMsg:boolean =  false;
  abc: any;
  OTPsuccessmessage: any;
  abcd: any;
  isLoginFailed: boolean = false;
  isLoggedIn: boolean = false;
  errorMessage: any ='';


  constructor(private router: Router, private fb: FormBuilder, private UserService: UserserviceService, public _snackBar: MatSnackBar) {
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.loginOtp = this.fb.group({
      loginOtps: ['', Validators.required],
    })
  }


  ngOnInit(): void {

  }
  clickLogin1() {
    if (this.loginform.controls.userName.value == "" || this.loginform.controls.password.value == "") {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.user = {
        "username": this.loginform.controls.userName.value,
        "password": this.loginform.controls.password.value,
      }
      this.UserService.login(this.user).subscribe((resp: any) => {
        this.message = resp;
        this.abcd = this.message.id;
        console.log('login id -->> ',this.message);
        console.log('login id -->> ',this.abcd);
        sessionStorage.setItem('userName', this.message.username);
        sessionStorage.setItem('email', this.message.email);
        sessionStorage.setItem('roles', this.message.roles);
        sessionStorage.setItem('jwt', this.message.jwt);
        if (this.abcd != null || this.abcd !='') {
          console.log('inside');
          this.showDeleteModal = true;
          this.userOTP = {
            "username": sessionStorage.getItem('userName')
          }
          this.UserService.getOtp(this.userOTP).subscribe((resp: any) => {
            this.OTPmessage = resp;
            console.log(this.OTPmessage, "OTP mSG")
            if(this.OTPmessage!=null){
              this._snackBar.open(this.OTPmessage.message,'',{ 
                panelClass: 'snackbar',
                 duration: 4000,
              });
            }
            else{
              this._snackBar.open(this.OTPmessage.message,'',{ 
                panelClass: 'snackbarerror',
                 duration: 4000,
              });
            }
          })
        }else{
          console.log('gsdgfh');
          this._snackBar.open(this.OTPmessage.message,'',{ 
            panelClass: 'snackbarerror',
             duration: 4000,
          });
        }
      });
      //this.showDeleteModal = true;
    }
  }

  clickLogin() {
    if (this.loginform.controls.userName.value == "" || this.loginform.controls.password.value == "") {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.user = {
        "username": this.loginform.controls.userName.value,
        "password": this.loginform.controls.password.value,
      }
      
      this.UserService.login(this.user).subscribe({
    next: resp => {
      // this.storageService.saveUser(data);
      this.isLoginFailed = false; 
      this.isLoggedIn = true;
      sessionStorage.setItem('userName', resp.username);
      sessionStorage.setItem('email', resp.email);
      sessionStorage.setItem('roles', resp.roles);
      sessionStorage.setItem('jwt', resp.jwt);

      if (this.abcd != null || this.abcd !='') {
        console.log('inside');
        this.showDeleteModal = true;
        this.userOTP = {
          "username": sessionStorage.getItem('userName')
        }
        this.UserService.getOtp(this.userOTP).subscribe((resp: any) => {
          this.OTPmessage = resp;
          console.log(this.OTPmessage, "OTP mSG")
          if(this.OTPmessage!=null){
            this._snackBar.open(this.OTPmessage.message,'',{ 
              panelClass: 'snackbar',
               duration: 4000,
            });
          }
          else{
            this._snackBar.open(this.OTPmessage.message,'',{ 
              panelClass: 'snackbarerror',
               duration: 4000,
            });
          }
        })
      }
    },
    error: err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this._snackBar.open('Enter correct Username/Password','',{ 
        panelClass: 'snackbarerror',
         duration: 2000,
      });
    }
  });
    }
  }

  closedeleteModel() {
    this.tagcloseotp = false;
  }
  submitOtp() {
    this.abc =  this.loginOtp.controls.loginOtps.value;
   console.log(this.abc.toString().length)
    if (this.loginOtp.controls.loginOtps.value == "") {
      this.submittedotp = true;
      //this.showvalidMsg = true;
    }else if(this.abc.toString().length < 6){
      this.showvalidMsg = true;
    }else if(this.abc.toString().length > 6){
      this.showvalidMsg = true;
    }
     else {
      // sessionStorage.setItem('userName', this.loginform.controls.userName.value);
      this.userOTP = {
        "email":sessionStorage.getItem('userName'),
        "otp":this.loginOtp.controls.loginOtps.value
      }
      this.UserService.successOtp(this.userOTP).subscribe((resp: any) => {
        this.OTPsuccessmessage = resp;
        console.log(this.OTPsuccessmessage, "OTP mSG")
        this._snackBar.open(this.OTPsuccessmessage.message,'',{ 
          panelClass: 'snackbar',
           duration: 4000,
        });
        if(this.OTPsuccessmessage.success== true){
          this._snackBar.open("Successfully Logged In",'',{ 
            panelClass: 'snackbar',
             duration: 4000,
          });
          console.log(sessionStorage.getItem('roles'),"user")
          if(sessionStorage.getItem('roles')== "ROLE_ADMIN")
          {
            this.router.navigateByUrl('/dashboard')
          }else if (sessionStorage.getItem('roles') == "ROLE_USER"){
           // this.router.navigateByUrl('/userDashboard')
            this.router.navigateByUrl('/userDashboard')
          }
        }
        else{
          console.log("Service Exception")
        }
      })
    }
  }
}
