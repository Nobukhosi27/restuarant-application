import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private firestore: Firestore) {}

  async addReview(userId: string, restaurantId: string, rating: number, review: string) {
    const reviewsRef = collection(this.firestore, 'reviews');
    await addDoc(reviewsRef, {
      userId,
      restaurantId,
      rating,
      review,
      timestamp: new Date(),
      adminResponse: null
    });
  }

  
  async getReviews(restaurantId: string) {
    const reviewsRef = collection(this.firestore, 'reviews');
    const q = query(reviewsRef, where('restaurantId', '==', restaurantId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  
  async getAllReviews() {
    const reviewsRef = collection(this.firestore, 'reviews');
    const q = query(reviewsRef, orderBy('timestamp', 'desc')); 
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  
  async respondToReview(reviewId: string, response: string) {
    const reviewDoc = doc(this.firestore, 'reviews', reviewId);
    await updateDoc(reviewDoc, { adminResponse: response });
  }
}
