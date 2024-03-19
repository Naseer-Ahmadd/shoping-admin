import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FirebaseStorageService } from 'src/app/services/firebase.storage';
declare var $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  addCategory=false
  product: any = {};
  category: any = {};
  catId: any;
  allCategories: any = [];
  downloadURL: Observable<string>;
  file:File | undefined
  catSelected:any={
      name:""
  }

  constructor(
    private dataService: DataService,
    private storage:FirebaseStorageService
  ) {
    this.downloadURL = new Observable<string>();
  }

  ngOnInit() {
    this.getAllCategories();
  }

  saveProduct(isValid: any, values: any) {
    console.log('values :', values);
    console.log('isValid :', isValid);
  }

  saveCategory(isValid: any, values: any) {
    if (this.category.id) {
      console.log(' in update:', values);
      this.updateCategory(values);
      return;
    }
    console.log('values: in create', values);
    this.dataService
      .addCategory(values,this.file)
      .then((categoryId: string) => {
        this.catId = categoryId;
        console.log('Category added successfully with ID:', categoryId);
        this.getAllCategories();
        this.toggleAddCategory()
        // Handle success here
      })
      .catch((error: any) => {
        console.error('Error adding category:', error);
        // Handle error here
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
        console.error('Error getting categories:', error);
        // Handle the error here
      });
  }

  editCategory(category: any) {
    this.toggleAddCategory()
    console.log('category :', category);
    this.category = category;
  }
  updateCategory(catValue: any) {
    console.log('cattt :', catValue);
  
    this.dataService
      .updateCategory(this.category.id, catValue)
      .then((res) => {
        console.log('res :', res);
        this.getAllCategories();
      })
      .catch((err) => {
        console.log('err in update:', err);
      });
  }

  deleteCategory(cat: any) {
    console.log('cat :', cat.id);
    this.dataService
      .deleteCategory(cat.id)
      .then((res) => {
        console.log('res :', res);
        this.getAllCategories();
      })
      .catch((err) => {
        console.log('err deleteCategory:', err);
      });
  }

  toggleAddCategory() {
    this.addCategory = !this.addCategory;
  }

  async onFileSelected(event: any) {
    this.file= event.target.files[0];
   }


   openCategoryInfoModel(cat: any) {
    this. catSelected = cat;
    $('#catInfoModel').modal('show');
  }
   
}
