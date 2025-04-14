import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonButtons } from '@ionic/angular/standalone';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, 
            IonTitle, IonToolbar,
            IonButton, IonButtons,
            CommonModule, FormsModule,RouterLink]
})
export class UserDashboardPage  {

  constructor(private auth: Auth, private router: Router) {}

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}


