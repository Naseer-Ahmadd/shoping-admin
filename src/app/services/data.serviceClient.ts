import { Injectable, inject } from '@angular/core';
//import { CollectionReference, Firestore,addDoc,collection, collectionData, documentId, getDocs, getFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from './models/User';
import { PATH_CATEGORY,PATH_PRODUCTS,PATH_USERS } from './models/Constants';
import 'firebase/firestore'; 

import * as firebase from 'firebase';
import { FireBaseConfig } from 'src/environments/firebase.config';
import { Category } from './models/Category';

@Injectable({
  providedIn: 'root',
})


export class DataServiceClient {
  private db: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(FireBaseConfig);
    this.db = firebase.firestore();
  }

  async placeOrder(order: Order): Promise<void> {
    try {
      const ordersCollection = this.db.collection('orders');
      await ordersCollection.add(order);
      // You may want to perform additional actions such as updating inventory, sending confirmation emails, etc.
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<void> {
    try {
      const orderDoc = this.db.collection('orders').doc(orderId);
      await orderDoc.update({ status: OrderStatus.Cancelled });
      // You may want to perform additional actions related to order cancellation.
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  async getMyOrders(userId: string): Promise<Order[]> {
    try {
      const ordersSnapshot = await this.db.collection('orders').where('userId', '==', userId).get();
      const orders: Order[] = [];
      ordersSnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), orderId: doc.id } as Order);
      });
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  async addAddress(userId: string, address: Address): Promise<void> {
    try {
      const userAddressesCollection = this.db.collection('userAddresses').doc(userId).collection('addresses');
      await userAddressesCollection.add(address);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  async updateAddress(userId: string, addressId: string, updatedAddress: Address): Promise<void> {
    try {
      const userAddressDoc = this.db.collection('userAddresses').doc(userId).collection('addresses').doc(addressId);
      await userAddressDoc.update(updatedAddress);
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }


  async addToCart(userId: string, product: Product, quantity: number): Promise<void> {
    try {
      const cartItemRef = this.db.collection('carts').doc(userId).collection('items').doc(product.productId);
      const existingCartItem = await cartItemRef.get();

      if (existingCartItem.exists) {
        // Item already exists in the cart, update the quantity
        const newQuantity = existingCartItem.data()!['quantity'] + quantity;
        await cartItemRef.update({ quantity: newQuantity });
      } else {
        // Item doesn't exist in the cart, add a new cart item
        await cartItemRef.set({ ...product, quantity });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    try {
      const cartItemRef = this.db.collection('carts').doc(userId).collection('items').doc(productId);
      await cartItemRef.delete();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  async increaseQuantity(userId: string, productId: string, quantity: number): Promise<void> {
    try {
      const cartItemRef = this.db.collection('carts').doc(userId).collection('items').doc(productId);
      const existingCartItem = await cartItemRef.get();

      if (existingCartItem.exists) {
        // Item exists in the cart, update the quantity
        const newQuantity = existingCartItem.data()!['quantity'] + quantity;
        await cartItemRef.update({ quantity: newQuantity });
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
      throw error;
    }
  }

  async decreaseQuantity(userId: string, productId: string, quantity: number): Promise<void> {
    try {
      const cartItemRef = this.db.collection('carts').doc(userId).collection('items').doc(productId);
      const existingCartItem = await cartItemRef.get();

      if (existingCartItem.exists) {
        // Item exists in the cart, update the quantity
        const newQuantity = Math.max(existingCartItem.data()!['quantity'] - quantity, 0);
        if (newQuantity === 0) {
          // If the quantity becomes zero, remove the item from the cart
          await cartItemRef.delete();
        } else {
          await cartItemRef.update({ quantity: newQuantity });
        }
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      throw error;
    }
  }





}

interface Order {
  orderId?: string;
  userId: string;
  customerName: string;
  shippingAddress: string;
  orderDate: firebase.firestore.Timestamp;
  totalAmount: number;
  items: OrderItem[];
  status: OrderStatus;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

interface Address {
  addressId?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
export function getTimeStamp():string
{
 var date = new Date();
 var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                 date.getUTCDate(), date.getUTCHours(),
                 date.getUTCMinutes(), date.getUTCSeconds());

return ""+now_utc
}
interface Product {
  productId: string;
  productName: string;
  price: number;
  // Add other product details as needed
}