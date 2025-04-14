import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,IonSearchbar } from '@ionic/angular/standalone';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restuarantlist',
  templateUrl: './restuarantlist.page.html',
  styleUrls: ['./restuarantlist.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem,
            IonList, IonContent,
            IonHeader, IonTitle, 
            IonToolbar,IonSearchbar,
            CommonModule, FormsModule]
})
export class RestuarantlistPage implements OnInit {

    restaurants: any[] = []; 
    filteredRestaurants: any[] = []; 
    searchQuery: string = '';
  
    constructor(private restaurantService: RestaurantService) {}
  
    ngOnInit() {
      this.loadRestaurants();
    }
  
    async loadRestaurants() {
      this.restaurantService.getRestaurants().subscribe(
        (data) => {
          console.log(' Firestore Data:', data); 
          if (!data || data.length === 0) {
            console.error(' No restaurants found. Check Firestore collection.');
          }
          this.restaurants = data;
          this.filteredRestaurants = data;
        },
        (error) => {
          console.error('Firestore Error:', error);
        }
      );
    }
    
    filterRestaurants() {
      const query = this.searchQuery.toLowerCase().trim();
      
      if (!query) {
        this.filteredRestaurants = [...this.restaurants]; 
        return;
      }
  
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
      );
  
      console.log('Filtered Restaurants:', this.filteredRestaurants); 
    }
  }
  

