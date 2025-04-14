import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/shared/booking';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.page.html',
  styleUrls: ['./manage-bookings.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, 
            IonItem, IonList, 
            IonContent, IonHeader, 
            IonTitle, IonToolbar, 
            CommonModule, FormsModule]
})
export class ManageBookingsPage implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  
  async loadBookings() {
    try {
      const bookingsData = await this.bookingService.getAllBookings(); 
      this.bookings = bookingsData;
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  }

  async updateBookingStatus(bookingId: string, newStatus: string) {
    try {
      await this.bookingService.updateBookingStatus(bookingId, newStatus);
      alert('Booking status updated!');
      this.loadBookings(); 
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status.');
    }
  }

  async deleteBooking(bookingId: string) {
    try {
      await this.bookingService.deleteBooking(bookingId);
      alert('Booking deleted!');
      this.loadBookings(); 
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking.');
    }
  }
} 
