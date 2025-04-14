import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel,IonInput,IonItem ,IonDatetime} from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking.service';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';
import { Booking } from 'src/shared/booking';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButton, 
            IonContent, IonHeader,
            IonTitle, IonToolbar,
            IonInput,IonItem,
            IonDatetime, CommonModule, FormsModule]
})
export class CreateBookingPage  implements OnInit{

restaurantId = '';
restaurantName = '';
dateTime = ''; 
guests = 1;
minDateTime: string = '';
loading = false; 

constructor(private bookingService: BookingService, private auth: Auth) {}

ngOnInit() {
  this.minDateTime = new Date().toISOString();
}

async bookTable() {
  if (this.loading) return;
  this.loading = true;

  const user = this.auth.currentUser;
  if (!user) {
    alert('Please log in to book a table.');
    this.loading = false;
    return;
  }

  if (!this.dateTime) {
    alert('Please select a valid date and time.');
    this.loading = false;
    return;
  }

  const bookingDateTime = new Date(this.dateTime);
  if (isNaN(bookingDateTime.getTime())) {
    alert('Invalid date and time selected.');
    this.loading = false;
    return;
  }

  const timestamp = Timestamp.fromDate(bookingDateTime);

  const booking: Omit<Booking, 'id'> = {
    userId: user.uid,
    restaurantId: this.restaurantId,
    restaurantName: this.restaurantName,
    dateTime: timestamp,
    guests: this.guests,
    status: 'pending',
  };

  try {
    await this.bookingService.createBooking(booking as Booking);
    alert(`Booking request submitted!`);
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to create booking. Please try again.');
  } finally {
    this.loading = false;
  }
}
}