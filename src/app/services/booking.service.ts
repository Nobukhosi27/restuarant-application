import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Booking } from 'src/shared/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async createBooking(booking: Booking) {
    const ref = collection(this.firestore, 'bookings');
    const docRef = await addDoc(ref, booking);
    this.sendNotification(booking.userId, 'Booking Confirmation', `Your table at ${booking.restaurantName} is booked.`);
    return docRef; // Return the document reference
  }
  
  getUserBookings(userId: string): Observable<Booking[]> {
    const ref = collection(this.firestore, 'bookings');
    const userBookingsQuery = query(ref, where('userId', '==', userId));
  
    return collectionData(userBookingsQuery, { idField: 'id' }) as Observable<Booking[]>;
  }
  

async getAllBookings(): Promise<Booking[]> {
  const bookingsCollection = collection(this.firestore, 'bookings');
  const bookingSnapshot = await getDocs(bookingsCollection);
  return bookingSnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data } as Booking;
  });
}


async updateBookingStatus(bookingId: string, newStatus: string) {
  const bookingRef = doc(this.firestore, `bookings/${bookingId}`);
  return updateDoc(bookingRef, { status: newStatus });
}


async deleteBooking(bookingId: string) {
  const bookingRef = doc(this.firestore, `bookings/${bookingId}`);
  return deleteDoc(bookingRef);
}

  async sendNotification(userId: string, title: string, body: string) {
    const tokensRef = collection(this.firestore, 'tokens');
    const q = query(tokensRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
  
    const sendPromises = querySnapshot.docs.map(doc => {
      const token = (doc.data() as { token: string }).token;  
      return this.pushNotification(token, title, body);
    });
  
    await Promise.all(sendPromises);
  }
  
  async pushNotification(token: string, title: string, body: string) {
    const payload = {
      notification: { title, body },
      to: token
    };

    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=YOUR_SERVER_KEY`
      },
      body: JSON.stringify(payload)
    });
  }
}
  

