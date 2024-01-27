import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { FireBaseConfig } from 'src/environments/firebase.config';
import { CategoryComponent } from './admin/category/category.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

// import { AngularFireModule } from '@angular/fire/';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
  

    
   
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 4000, // 4 seconds
      progressBar: true,
    }),
    // AngularFireModule.initializeApp(FireBaseConfig),
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
