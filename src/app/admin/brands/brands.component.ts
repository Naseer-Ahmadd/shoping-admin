import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brand: any = []
  allBrands:any= []
  constructor(private dataService: DataService,private spinner: NgxSpinnerService,private toastrService: ToastrService){

  }

  ngOnInit(){
    this.spinner.show();
    this.getBrands()
  }

  getBrands(){
    this.dataService.getBrands() 
    .then((brand) => {
      this.allBrands = brand;
      console.log('this.allBrands :', this.allBrands);
      this.spinner.hide();
      // Handle the retrieved products here
    })
    .catch((error: any) => {
      this.toastrService.error(error, 'Title Success!');
      // Handle the error here
    });
  }

  addBrand(values:any){
    if(values){
      // if(this.brand.id){
      //   console.log('in update :', );
      //   this.updateBrand(this.brand)
      // }
      console.log('in create :', );
      this.spinner.show();
      this.dataService.addBrand(values).then(res=>{
        this.toastrService.success('Brand Added Successfully!', 'Title Success!');
        this.brand={}
        this.getBrands()
        this.spinner.hide();
      }).catch(error=>{
        this.toastrService.error(error, 'Title Error!');
      })
    }
  }

  
  openBrandModal(brand:any){
    this.brand = brand;
    console.log('this.brand1 :', this.brand);
    $('#updateBrandModal').modal('show');
  }

  async updateBrand(brnad:any){
    if(this.brand.id){
      try {
        this.spinner.show();
        await this.dataService.updateBrand(this.brand.id, this.brand)
        this.toastrService.success('Brand Updateed Successfully!', 'Title Success!');
        this.spinner.hide();
        this.getBrands()
        this.brand={}
        $('#updateBrandModal').modal('hide');
      } catch (error) {
        this.toastrService.error('Error in Update', 'Title Error!');
      }
    }
  }


}
