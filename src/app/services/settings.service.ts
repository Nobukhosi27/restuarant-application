import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private firestore: Firestore) {}

  
  async getUserSettings(userId: string) {
    const settingsDoc = doc(this.firestore, 'settings', userId);
    const snapshot = await getDoc(settingsDoc);
    return snapshot.exists() ? snapshot.data() : null;
  }

  async updateUserSettings(userId: string, settings: any) {
    const settingsDoc = doc(this.firestore, 'settings', userId);
    await updateDoc(settingsDoc, settings);
  }

  async createUserSettings(userId: string) {
    const settingsDoc = doc(this.firestore, 'settings', userId);
    await setDoc(settingsDoc, { userId, notificationsEnabled: true, theme: 'light' });
  }
}
