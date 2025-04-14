import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonList, IonLabel, IonButtons, IonItemDivider } from '@ionic/angular/standalone';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-restuarants',
  templateUrl: './manage-restuarants.page.html',
  styleUrls: ['./manage-restuarants.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonButtons,
            IonLabel, IonList, 
            IonButton, IonItem,
            IonContent, IonHeader,
            IonTitle, IonToolbar,
            CommonModule, FormsModule]
})
export class ManageRestuarantsPage implements OnInit {

  restaurants: any[] = [];

  newRestaurant = {
    name: '',
    cuisine: '',
    description: '',
    location: '',
    rating: null
  };

  constructor(
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.loadRestaurants();
  }

  async loadRestaurants() {
    const snapshot = await getDocs(collection(this.firestore, 'restaurants'));
    this.restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async addRestaurant() {
    const { name, cuisine, description, location, rating } = this.newRestaurant;
    if (!name.trim() || !cuisine.trim()) return;

    await addDoc(collection(this.firestore, 'restaurants'), {
      name,
      cuisine,
      description,
      location,
      rating
    });

    
    this.newRestaurant = {
      name: '',
      cuisine: '',
      description: '',
      location: '',
      rating: null
    };

    await this.loadRestaurants();
  }

  async deleteRestaurant(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this restaurant?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'restaurants', id));
            this.loadRestaurants();
          }
        }
      ]
    });
    await alert.present();
  }

  async editRestaurant(restaurant: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Restaurant',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: restaurant.name
        },
        {
          name: 'cuisine',
          type: 'text',
          placeholder: 'Cuisine',
          value: restaurant.cuisine
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description',
          value: restaurant.description
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Location',
          value: restaurant.location
        },
        {
          name: 'rating',
          type: 'number',
          placeholder: 'Rating (0-5)',
          value: restaurant.rating
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: async (data) => {
            await updateDoc(doc(this.firestore, 'restaurants', restaurant.id), data);
            this.loadRestaurants();
          }
        }
      ]
    });

    await alert.present();
  }
}