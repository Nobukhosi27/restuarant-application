import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList,IonButton,IonItem,IonLabel } from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/shared/booking';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';



@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,
            IonTitle, IonToolbar,
            IonList,IonButton,
            IonItem,IonLabel, 
            CommonModule, FormsModule]
})
export class MyBookingsPage implements OnInit {

  bookings: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService, private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loadBookings(user.uid);
      } else {
        this.loading = false;
        alert('Please log in to view your bookings.');
      }
    });
  }

  loadBookings(userId: string) {
    this.bookingService.getUserBookings(userId).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        alert('Failed to load bookings.');
        this.loading = false;
      }
    });
  }

  cancelBooking(id: string) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.deleteBooking(id).then(() => {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        alert('Booking canceled.');
      }).catch(error => {
        console.error('Error canceling booking:', error);
        alert('Failed to cancel booking.');
      });
    }
  }
}
