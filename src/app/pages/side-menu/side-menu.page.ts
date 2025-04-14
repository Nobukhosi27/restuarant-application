import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonItem, IonButtons, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, 
            IonItem,
            IonToolbar,IonTitle,
            IonHeader,IonContent,
            CommonModule, FormsModule,RouterLink]
})
export class SideMenuPage implements OnInit {

  user: any;

 constructor(private authService: AuthService, private auth: Auth, private router: Router) {}

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }
}

