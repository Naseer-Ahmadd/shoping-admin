import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
    providedIn: 'root',
  })
export class FirebaseStorageService {
  private storage: firebase.storage.Storage;

  constructor() {
    // Initialize Firebase Storage
    this.storage = firebase.storage();
  }

  async uploadFile(file: File, destinationPath: string): Promise<string> {

    if(this.validateImage(file)==false)
    {
        return "IMAGE IS NOT COMPATABLE"
    }
    // Create a reference to the storage location
    const storageRef = this.storage.ref(destinationPath);

    try {
      // Upload the file to the specified path
      const snapshot = await storageRef.put(file);

      // Get the download URL for the file
      const downloadURL = await snapshot.ref.getDownloadURL();

      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  }


   validateImage(file: File): boolean {
    if(true)
    {
        /**
         * 
         * 
         * VALIDATION IS DISABLED FOR NOW
         */
        return true
    }
    // Check if the file is present
    if (!file) {
      console.error('No file provided for validation.');
      return false;
    }
  
    // Check if the file type is PNG
    if (file.type !== 'image/png') {
      console.error('Invalid image type. Please upload a PNG image.');
      return false;
    }
  
    // Create an image element to get the dimensions
    const img = new Image();
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      img.src = e.target.result;
  
      // Check if the image has the required dimensions (300x300)
      img.onload = () => {
        const width = img.width;
        const height = img.height;
  
        if (width === 300 && height === 300) {
          console.log('Image validation successful.');
          return true;
        } else {
          console.error('Invalid image dimensions. Image must be 300x300 pixels.');
          return false;
        }
      };
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(file);
  
    return false;
  }
}