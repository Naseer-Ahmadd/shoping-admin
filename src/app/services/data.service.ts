import { Injectable, inject } from '@angular/core';
//import { CollectionReference, Firestore,addDoc,collection, collectionData, documentId, getDocs, getFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models/Product';
import { UserModel } from './models/User';
import { PATH_CATEGORY,PATH_PRODUCTS,PATH_SHOP,PATH_USERS } from './models/Constants';
import 'firebase/firestore'; 

import * as firebase from 'firebase';
import { FireBaseConfig } from 'src/environments/firebase.config';
import { Category } from './models/Category';
import { finalize } from 'rxjs/operators';
import { FirebaseStorageService } from './firebase.storage';
// import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})


export class DataService {
  
  private db: firebase.firestore.Firestore;
  private firebaseStorage:FirebaseStorageService
  constructor() {
    firebase.initializeApp(FireBaseConfig);
    this.db = firebase.firestore();
      this.firebaseStorage=new FirebaseStorageService()
   
    
    
   
    }
    /**
     * 
     * 
     * 
     * CATGEGORIES SECTION
     */

    private get getCategoriesCollection() {
      return this.db.collection(PATH_CATEGORY);
    }

   
    async getCategories(): Promise<Category[]> {
      const snapshot = await this.getCategoriesCollection.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    }
  
    async getCategoryById(categoryId: string): Promise<Category | null> {
      const doc = await this.getCategoriesCollection.doc(categoryId).get();
      return doc.exists ? ({ id: doc.id, ...doc.data() } as Category) : null;
    }
  
    async addCategory(category: Category,file?:File): Promise<string> {
       /**
        * 
        * PASS THE FILE THROUGH FILE VALIDATION RULES FIRST
        * 
        * 
        */
         if(!file){
          return "Image not selected"
         }

          const categoryId = category.id || this.getCategoriesCollection.doc().id;
          const url= this.firebaseStorage.uploadFile(file,categoryId)
         url.then((imageUrl: string) => {
           category.imageUrl=imageUrl
           const docRef =  this.getCategoriesCollection.doc(categoryId).set(this.addMeta(category));
         })
         

  
        return categoryId
    }
  
    async updateCategory(categoryId: string, newData: Partial<Category>): Promise<void> {
      await this.getCategoriesCollection.doc(categoryId).update(this.addMeta(newData));
    }
  
    async deleteCategory(categoryId: string): Promise<void> {
      await this.getCategoriesCollection.doc(categoryId).delete();
    }




    /**
     * 
     * 
     * 
     * 
     * 
     * PRODUCTS SECTION
     */


    private get getProductsCollection() {
      return this.db.collection(PATH_CATEGORY);
    }

    async getProducts(): Promise<Product[]> {
      const snapshot = await this.getProductsCollection.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    }
  
    async getProductById(productId: string): Promise<Product | null> {
      const doc = await this.getProductsCollection.doc(productId).get();
      return doc.exists ? ({ id: doc.id, ...doc.data() } as Product) : null;
    }
  
     async addProduct(product: Product): Promise<void> {
       const productID=this.getProductsCollection.doc().id
      await this.getProductsCollection.doc(productID).set(this.addMeta(product));
    }
  
    async updateProduct(productId: string, product: Partial<Product>): Promise<void> {
        await this.getProductsCollection.doc(productId).update(this.addMeta(product));
    }
  
    async deleteProduct(productId: string): Promise<void> {
      await this.getProductsCollection.doc(productId).delete();
    }


    /**
     * 
     * 
     * 
     * SHOP INFORMATION
     */

    addShopInformation(formData: any): Promise<void> {
      // Use the 'shops' collection in Firestore
      const shopsCollection = this.db.collection(PATH_SHOP);
  
      // Add the shop information to the collection
      return shopsCollection.doc("shopinformation").set(formData);
    }

    getShopInformation(): Promise<any> {
      // Use the 'shops' collection in Firestore
      const shopsCollection = this.db.collection(PATH_SHOP);
    
      // Get the document with ID "shopinformation" from the collection
      const shopDocument = shopsCollection.doc("shopinformation");
    
      // Retrieve the data from the document
      return shopDocument.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            // Document exists, return the data
            return docSnapshot.data();
          } else {
            // Document doesn't exist
            return null;
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error getting shop information:", error);
          throw error;
        });
    }

    /**
     * 
     * 
     * 
     * HELPERS 
     */

   getTimeStamp():string
   {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());

   return ""+now_utc
   }
   

   addMeta(model:any):any{
    try{
    if(model.creationDate==null || model.creationDate=="" )
    {
    model.creationDate=this.getTimeStamp()
    }
    model.updationDate=this.getTimeStamp()
    model.addedBy=this.getUserID()
    }catch{

  }
    return model
   }

   getUserID():string{
     return firebase.auth().currentUser?.uid || "NA"
   
   }




   

}

export function getTimeStamp():string
{
 var date = new Date();
 var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                 date.getUTCDate(), date.getUTCHours(),
                 date.getUTCMinutes(), date.getUTCSeconds());

return ""+now_utc
}
