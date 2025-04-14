import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonImg,IonList,IonItem,IonInput,IonButton, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent,
            IonHeader, IonTitle, 
            IonToolbar,IonItem,
            IonInput,IonButton,
            RouterLink,  CommonModule, FormsModule]
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const uid = userCredential.user.uid;

      // Fetch user role from Firestore
      const userDocRef = doc(this.firestore, 'users', uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as any;
        const role = userData.role;

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      } else {
        alert('User role not found.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  }
}
