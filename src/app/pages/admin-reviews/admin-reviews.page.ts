import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCardContent,IonButton,IonCardHeader, IonCardTitle,IonCard ,IonLabel} from '@ionic/angular/standalone';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.page.html',
  styleUrls: ['./admin-reviews.page.scss'],
  standalone: true,
  imports: [IonCard, IonContent, 
            IonHeader, IonTitle,
            IonToolbar,IonCardContent,
            IonButton, IonCardHeader,
            IonCardTitle,CommonModule, FormsModule]
})
export class AdminReviewsPage implements OnInit {

  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadAllReviews();
  }

  loadAllReviews() {
    this.reviewService.getAllReviews().then((reviews) => {
      this.reviews = reviews;
    });
  }

  respondToReview(reviewId: string, response: string) {
    this.reviewService.respondToReview(reviewId, response);
  }
}
