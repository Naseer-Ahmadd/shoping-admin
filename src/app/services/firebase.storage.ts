import * as firebase from 'firebase/app';
import 'firebase/storage';

class FirebaseStorageService {
  private storage: firebase.storage.Storage;

  constructor() {
    // Initialize Firebase Storage
    this.storage = firebase.storage();
  }

  async uploadFile(file: File, destinationPath: string): Promise<string> {
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
}