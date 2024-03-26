import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseStorageService } from 'src/app/services/firebase.storage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  product: any = {};
  allCategories: any = [];
  allproducts: any = []
  addProduct = false
  file:File | undefined
  images: any = []
  productToDelete: any;
  parentCategoryID: any;
  constructor(
    private dataService: DataService, private storage: FirebaseStorageService,
    private spinner: NgxSpinnerService,private toastrService: ToastrService
  ) {
    // this.downloadURL = new Observable<string>();
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts(){
    this.dataService.getProducts() 
    .then((products) => {
      this.allproducts = products;
      this.allproducts.sort((a:any, b:any) => {
        const timestampA = a.creationDate;
        const timestampB = b.creationDate;
        return timestampB - timestampA; // Descending order (latest first)
    });
      this.spinner.hide();
      // Handle the retrieved products here
    })
    .catch((error: any) => {
      this.toastrService.error(error, 'Title Success!');
      // Handle the error here
    });
  }
  getAllCategories() {
    this.dataService
      .getCategories()
      .then((categories) => {
        this.allCategories = categories;
        console.log('this.allCategories :', this.allCategories);
        // Handle the retrieved categories here
      })
      .catch((error: any) => {
      this.toastrService.error(error, 'Title Error!');
        // Handle the error here
      });
  }

  updateCat(catId:any){
    this.parentCategoryID =this.getParentCatId(catId)
  }

  getParentCatId(id:any){
    let cat = this.allCategories.find((cat: { id: any; }) =>cat.id === id)
    const l0CatMatch = cat.deeplink.match(/l0_cat=(\d+)/);
    if (l0CatMatch && l0CatMatch[1]) {
      return l0CatMatch[1];
    }
  }
  saveProduct(isValid: any, values: any){
    if(this.product.id){
      console.log('inn update :', );
      this.updateProduct(this.product)
      return
    }
    console.log('inn create :', );
    if(this.product){
      if(this.parentCategoryID){
        this.product.parentCategoryID = Number(this.parentCategoryID)
      }    
      this.product.created_at = Date.now()
      this.spinner.show();
      this.dataService.addProduct(this.product).then(res=>{
        this.toastrService.success('Producted Added Successfully!', 'Title Success!');
        this.product={}
        this.getAllProducts()
        this.spinner.hide();
        this.toggleAddProduct()
      }).catch(error=>{
        this.toastrService.error(error, 'Title Error!');
      })
    }
  }

  editProuct(product:any){
    this.product = product
    this.toggleAddProduct()
  }

  async updateProduct(prod:any){
    try {
      if(this.parentCategoryID){
        prod.parentCategoryID = Number(this.parentCategoryID)
      }
      prod.updated_at = new Date()
      this.spinner.show();
      await this.dataService.updateProduct(prod.id, prod)
      this.toastrService.success('Product Updateed Successfully!', 'Title Success!');
      this.spinner.hide();
      this.toggleAddProduct()
      this.getAllProducts()
      this.product={}
    } catch (error) {
      this.toastrService.error('Error in Update', 'Title Error!');
    }
  }

  openDeleteConfirmationModal(product: any) {
    this.productToDelete = product;
    $('#deleteConfirmationModal').modal('show');
  }

  cancelDelete() {
    $('#deleteConfirmationModal').modal('hide');
  }
  // Delete the product after confirmation
  async deleteProductConfirmed() {
    if (this.productToDelete) {
      try {
        this.spinner.show();
        await this.dataService.deleteProduct(this.productToDelete.id);
        this.getAllProducts();
        this.toastrService.warning('Product deleted Successfully!', 'Title warning!');
        this.spinner.hide();
      } catch (error) {
        this.toastrService.error('Error in Delete', 'Title Error!');
      } finally {
        $('#deleteConfirmationModal').modal('hide'); // Close the modal
        this.productToDelete = null; // Reset the product to be deleted
      }
    }
  }

  async onFileSelected(event: any) {
    this.spinner.show();
    const uploadedImage = await this.storage.uploadFile(event.target.files[0], 'prod-images');
    this.images[this.images[0] ? 1 : 0] = uploadedImage;
    this.product.productImages = this.images;
    this.spinner.hide();

  }
  

  toggleAddProduct(){
    this.addProduct = !this.addProduct;
  }
}
