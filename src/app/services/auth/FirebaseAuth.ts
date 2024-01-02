// firebaseAuthHelper.ts

import * as firebase from 'firebase';
import 'firebase/auth';

interface User {
    email: string;
    uid: string;
  }
  
  class FirebaseAuthHelper {
    async signUpWithEmailAndPassword(email: string, password: string): Promise<User> {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return { email: user?.email || '', uid: user?.uid || '' };
      } catch (error) {
        // console.error(error.message);
        throw new Error('Sign up failed');
      }
    }
  
    async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return { email: user?.email || '', uid: user?.uid || '' };
      } catch (error) {
        // console.error(error.message);
        throw new Error('Sign in failed');
      }
    }
  
    async signOut(): Promise<void> {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        // console.error(error.message);
        throw new Error('Sign out failed');
      }
    }
  
    getCurrentUser(): Promise<User | null> {
      return new Promise<User | null>((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user ? { email: user.email || '', uid: user.uid || '' } : null);
        }, reject);
      });
    }
  }
  
  export default FirebaseAuthHelper;
