import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {signUp} from "./signUp";
import {SignUpService} from "./sign-up.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form;
  hide=true;
   sign;


  constructor(private sigup:SignUpService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit() {
     this.sign=new signUp();

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]))
    })
  }



  onSubmit(signUp) {
   this.sign.companyName=signUp.firstName+' '+signUp.lastName;
   this.sign.emailId=signUp.emailId;
   this.sign.password=signUp.password;
   let val= JSON.stringify(this.sign)
    this.sigup.saveUser(val).subscribe(data=>{
      if(data.status){
        this.router.navigate([''])
        this.snackBar.open('Sign Up Successful','X',{
          duration: 5000,
        })
      }
    })


  }


}
