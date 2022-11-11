import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  user: any;
  message: any;
  selectedUserRole: any;
 
  constructor(private router: Router , 
    private fb:FormBuilder,
    private UserService:UserserviceService) 
    {
    // this.registerform = this.fb.group({
    //   userName:['',Validators.required],
    //   Mobile:['',Validators.required ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    //   password:['',Validators.required],
    //   selectRole:['',Validators.required]
    // })
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      selectRole: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
   }

  ngOnInit(): void {
  }
  get f() { return this.registerForm.controls; }
  clickRegister(){
   this.submitted = true;
   console.log( this.submitted)
   if (this.registerForm.invalid) {
    return;
}

// alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

    // if(this.registerForm.controls.userName.value == "user"){
    //  this.selectedUserRole  = "user"
    // }else{
    //   this.selectedUserRole  = "admin"
    // }
    if(this.registerForm.controls.username.value== "" || this.registerForm.controls.password.value== "" || this.registerForm.controls.email.value== "" || this.registerForm.controls.selectRole.value== ""){
      this.submitted = true;
    }else{
      console.log( this.registerForm.controls.selectRole.value,"role")
      this.user = {
        "username":this.registerForm.controls.username.value,
        "email": this.registerForm.controls.email.value,
         "password":this.registerForm.controls.password.value,
          "roles": [this.registerForm.controls.selectRole.value],
          "otp": 0
      }
      this.UserService.register(this.user).subscribe((resp: any) => {
        console.log(resp);
        this.message = resp;
        this.router.navigate(["login"]);
      });
      this.submitted = false
      this.router.navigateByUrl('/login')
    }
  }}
//}
