import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminDashboardPage implements OnInit {

  totalBookings = 0;
  totalRestaurants = 0;
  popularSlot = 'Loading...';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.fetchStats();
  }

  async fetchStats() {
    const bookingsSnap = await getDocs(collection(this.firestore, 'bookings'));
    const restaurantsSnap = await getDocs(collection(this.firestore, 'restaurants'));

    this.totalBookings = bookingsSnap.size;
    this.totalRestaurants = restaurantsSnap.size;

    // Example logic: Get most common time slot
    const slotCount: any = {};
    bookingsSnap.forEach(doc => {
      const slot = doc.data()['timeSlot'];
      if (slot) {
        slotCount[slot] = (slotCount[slot] || 0) + 1;
      }
    });

    const popular = Object.entries(slotCount).sort((a: any, b: any) => b[1] - a[1]);
    this.popularSlot = popular.length ? `${popular[0][0]} (${popular[0][1]} bookings)` : 'No data';
  }
}
