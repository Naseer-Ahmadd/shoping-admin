import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  product: any = {};
  category: any = {};
  catId: any;
  allCategories: any = [];
  downloadURL: Observable<string>;

  constructor(
    private dataService: DataService /* private storage: AngularFireStorage */
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
      .addCategory(values)
      .then((categoryId: string) => {
        this.catId = categoryId;
        console.log('Category added successfully with ID:', categoryId);
        this.getAllCategories();
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

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // if (file) {
    //   try {
    //     const file = event.target.files[0];
    //     var n = Date.now();

    //     const filePath = `category-image/${Date.now()}`;
    //     const fileRef = this.storage.ref(filePath);
    //     const task = this.storage.upload(filePath, file);
    //     task
    //       .snapshotChanges()
    //       .pipe(
    //         finalize(() => {
    //           this.downloadURL = fileRef.getDownloadURL();
    //           this.downloadURL.subscribe((url) => {
    //             if (url) {
    //               this.category.imageUrl = url;
    //             }
    //             console.log('imageeeeeeee', this.category.imageUrl);
    //           });
    //         })
    //       )
    //       .subscribe((url) => {
    //         if (url) {
    //           console.log(url);
    //         }
    //       });
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //   }
    // }
  }
}
