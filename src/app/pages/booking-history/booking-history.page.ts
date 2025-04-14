import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking.service';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, 
            IonItem, IonList, 
            IonCardContent, IonCardTitle, 
            IonCardHeader, IonCard, 
            IonContent, IonHeader,
            IonTitle, IonToolbar, 
            CommonModule, FormsModule,RouterLink]
})
export class BookingHistoryPage implements OnInit {

  userId!: string;
  bookingHistory: any[] = [];

  constructor(private bookingService: BookingService, private auth: Auth) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.userId = currentUser.uid;
      this.loadBookingHistory();
    }
  }


  async loadBookingHistory() {
    this.bookingService.getUserBookings(this.userId).subscribe(bookings => {
      this.bookingHistory = bookings; // Assign the array properly
    });
  }
  
  async cancelBooking(bookingId: string) {
    await this.bookingService.deleteBooking(bookingId);
    this.bookingHistory = this.bookingHistory.filter(booking => booking.id !== bookingId);
    alert('Booking canceled successfully!');
  }
}