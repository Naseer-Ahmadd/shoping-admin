import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/services/models/Category';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {};
  email='admin.ge@gmail.com'
  pwd='ge@123#'
  constructor(private router: Router,private firebase:DataService,private spinner: NgxSpinnerService,private toastrService: ToastrService
    ){

    let category:Category={
      name: "JJJS",
      description: 'jsjjs'
    }
    firebase.addCategory(category)
  
    
  }
  login() {
    console.log('this.credentials.email :', this.credentials.email);
    console.log('this.credentials.password :', this.credentials.password);
    this.spinner.show()
    if(this.credentials.password==this.pwd && this.credentials.email == this.email){
      localStorage.setItem('creds', this.credentials.email)
      this.toastrService.success('Logged in Sucessfully');
      this.spinner.hide()
      this.router.navigate(['admin/dashboard'])
    }else{
      this.toastrService.error('Email or Password is incorrect');
      this.spinner.hide()
    }
  }
}