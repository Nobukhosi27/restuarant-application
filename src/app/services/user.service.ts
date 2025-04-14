import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  
  async getUserProfile(userId: string) {
    const userDoc = doc(this.firestore, 'users', userId);
    const snapshot = await getDoc(userDoc);
    return snapshot.exists() ? snapshot.data() : null;
  }

  
  async updateUserProfile(userId: string, data: any) {
    const userDoc = doc(this.firestore, 'users', userId);
    await updateDoc(userDoc, data);
  }

  async createUserProfile(userId: string, email: string) {
    const userDoc = doc(this.firestore, 'users', userId);
    await setDoc(userDoc, { userId, email, name: '', phone: ''});
  }
}
