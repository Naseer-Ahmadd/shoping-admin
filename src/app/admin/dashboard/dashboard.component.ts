import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  allCategories: any = [];
  allproducts: any = []
  allBrands:any= []

  constructor(
    private dataService: DataService,
  ) {
    // this.downloadURL = new Observable<string>();
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
    this.getBrands()
  }

  getAllProducts(){
    this.dataService.getProducts() 
    .then((products) => {
      this.allproducts = products;
    })
    .catch((error: any) => {
    console.log('error :', error);
      // this.toastrService.error(error, 'Title Success!');
    });
  }
  getAllCategories() {
    this.dataService
      .getCategories()
      .then((categories) => {
        this.allCategories = categories;
      })
      .catch((error: any) => {
      console.log('error :', error);
      // this.toastrService.error(error, 'Title Error!');
      });
  }

  getBrands(){
    this.dataService.getBrands() 
    .then((brand) => {
      this.allBrands = brand;
      console.log('this.allBrands :', this.allBrands);
      // Handle the retrieved products here
    })
    .catch((error: any) => {
    console.log('error :', error);
      // Handle the error here
    });
  }
}
