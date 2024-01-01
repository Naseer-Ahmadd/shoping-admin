import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/services/models/Category';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {};
  email='naseer.tlgt232@gmail.com'
  pwd='wer@123#'
  constructor(private router: Router,private firebase:DataService){

  
    
  }
  login() {
    if(this.credentials.password==this.pwd && this.credentials.email == this.email){
      localStorage.setItem('creds', this.credentials.email)
      this.router.navigate(['admin/dashboard'])
    }
  }
}