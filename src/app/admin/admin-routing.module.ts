import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { ShopComponent } from '../shop/shop.component';
import { BrandsComponent } from '../brands/brands.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { CustomersComponent } from '../customers/customers.component';

const routes: Routes = [
  { path: '',component: AdminComponent,
	children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'brands',
        component: BrandsComponent
      }
      ,
      {
        path: 'landingpage',
        component: LandingpageComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      }
    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
