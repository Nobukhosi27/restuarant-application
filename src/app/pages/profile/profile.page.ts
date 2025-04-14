import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, 
            IonItem, IonCardContent,
            IonCardHeader, IonCardTitle,
            IonCard, IonContent, 
            IonHeader, IonTitle, 
            IonToolbar, CommonModule, 
            FormsModule, RouterLink]
})
export class ProfilePage implements OnInit {

  userId!: string;
  userProfile: any = { name: '', email: '', phone: '' };

  constructor(private userService: UserService, private auth: Auth) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.userId = currentUser.uid;
      this.userProfile = await this.userService.getUserProfile(this.userId);
    }
  }

  async updateProfile() {
    await this.userService.updateUserProfile(this.userId, this.userProfile);
    alert('Profile updated successfully!');
  }
}