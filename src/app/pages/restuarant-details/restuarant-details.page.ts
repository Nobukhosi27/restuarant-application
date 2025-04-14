import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restuarant-details',
  templateUrl: './restuarant-details.page.html',
  styleUrls: ['./restuarant-details.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem,
            IonList, IonCard,
            IonContent, IonHeader,
            IonTitle, IonToolbar,
            IonCardContent,IonCardHeader,
            IonCardTitle, CommonModule, FormsModule]
})
export class RestuarantDetailsPage implements OnInit {

  restaurantId!: string;  
  reviews: any[] = [];    

  constructor(
    private reviewService: ReviewService, 
    private activatedRoute: ActivatedRoute  
  ) {}

  async ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.paramMap.get('restaurantId')!;
    
  
    this.reviews = await this.reviewService.getReviews(this.restaurantId);
  }
}