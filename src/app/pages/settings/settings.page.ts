import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonRadio, IonButton } from '@ionic/angular/standalone';
import { SettingsService } from 'src/app/services/settings.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonRadio, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  userId!: string;
  settings: any = { notificationsEnabled: true, theme: 'light' };

  constructor(private settingsService: SettingsService, private auth: Auth) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.userId = currentUser.uid;
      const userSettings = await this.settingsService.getUserSettings(this.userId);
      if (userSettings) {
        this.settings = userSettings;
      } else {
        await this.settingsService.createUserSettings(this.userId);
      }
    }
  }

  async updateSettings() {
    await this.settingsService.updateUserSettings(this.userId, this.settings);
    alert('Settings updated successfully!');
  }

  changeTheme() {
    document.body.setAttribute('color-theme', this.settings.theme);
  }
}
