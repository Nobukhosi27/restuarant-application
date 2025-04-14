import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,IonInput,IonTextarea,IonLabel,IonItem,IonSelect,IonSelectOption,} from '@ionic/angular/standalone';
import { ReviewService } from 'src/app/services/review.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [ IonContent,IonHeader,
             IonToolbar,IonTitle,
             IonButton,IonInput,
             IonTextarea,IonLabel,
             IonItem,IonSelect,
             IonSelectOption,CommonModule, FormsModule]
})
export class ReviewsPage  {

  restaurantId = '';
  rating = 5;
  reviewText = '';
  loading = false;

  constructor(private reviewService: ReviewService, private auth: Auth) {}

  async submitReview() {
    if (this.loading) return;
    this.loading = true;

    const user = this.auth.currentUser;
    if (!user) {
      alert('Please log in to submit a review.');
      this.loading = false;
      return;
    }

    if (!this.restaurantId || !this.reviewText) {
      alert('Please provide all required fields.');
      this.loading = false;
      return;
    }

    try {
      await this.reviewService.addReview(user.uid, this.restaurantId, this.rating, this.reviewText);
      alert('Review submitted successfully!');
      this.rating = 5;
      this.reviewText = '';
      this.restaurantId = '';
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    } finally {
      this.loading = false;
    }
  }
}


