import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  formData: any = {}; // Object to store form data

  constructor(
    private dataService: DataService,
    
  ) {
    this.getInformtaion()
   
  }
  
  getInformtaion()
  {
    // Assuming you have an instance of your data service named 'dataService'
    this.dataService.getShopInformation().then((shopData) => {
  if (shopData !== null) {
    this.formData=shopData

  } else {
    
  }
}).catch((error: any) => {
   
});

  }


  onSubmit() {
    
    console.log('Form submitted with data:', this.formData);
    this.dataService.addShopInformation(this.formData)

   
  }

}
