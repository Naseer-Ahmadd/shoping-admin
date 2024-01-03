import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { FireBaseConfig } from 'src/environments/firebase.config';
import { CategoryComponent } from './admin/category/category.component';

// import { AngularFireModule } from '@angular/fire/';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
  

    
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // AngularFireModule.initializeApp(FireBaseConfig),
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
