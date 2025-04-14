import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/shared/restuarant';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private firestore: Firestore) {}


 getRestaurants(): Observable<any[]> {
  const restCollection = collection(this.firestore, 'restuarant'); 
  return collectionData(restCollection, { idField: 'id' });
}
async addRestaurant(restaurant: Omit<Restaurant, 'id'>) {
  const ref = collection(this.firestore, 'restuarant'); 
  return addDoc(ref, restaurant);
}


updateRestaurant(id: string, data: Partial<Restaurant>) {
  const restaurantRef = doc(this.firestore, `restuarant/${id}`); 
  return updateDoc(restaurantRef, data);
}


deleteRestaurant(id: string) {
  const restaurantRef = doc(this.firestore, `restuarant/${id}`); // Fix path
  return deleteDoc(restaurantRef);
}
}