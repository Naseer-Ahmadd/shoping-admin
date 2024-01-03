import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ShopComponent } from '../shop/shop.component';
import { BrandsComponent } from '../brands/brands.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    LoginComponent,
    CategoryComponent,
    ShopComponent,
    BrandsComponent,
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
