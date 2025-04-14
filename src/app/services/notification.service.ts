import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private firestore: Firestore) {}

  
  async requestPermission() {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive !== 'granted') {
      alert('Push Notifications not allowed!');
      return;
    }
    this.registerDevice();
  }

  async registerDevice() {
    await PushNotifications.register();
    PushNotifications.addListener('registration', (token) => {
      this.saveToken(token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notification Received:', notification);
      alert(`New Notification: ${notification.title} - ${notification.body}`);
    });
  }

  async saveToken(token: string) {
    const ref = collection(this.firestore, 'tokens');
    await addDoc(ref, { token });
  }
}
