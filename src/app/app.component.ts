import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonList, IonItem, IonContent,IonMenu } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification.service';
import { SideMenuPage } from './pages/side-menu/side-menu.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonContent,IonMenu, IonRouterOutlet,CommonModule,SideMenuPage],
})
export class AppComponent {
  
  constructor(private notificationService: NotificationService) {
    this.notificationService.requestPermission();
  }
}

