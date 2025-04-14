import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonInput,IonItem,IonImg,IonButton,IonSelectOption,IonCheckbox, IonLabel, IonList } from '@ionic/angular/standalone';
import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonLabel, IonContent, IonHeader,
            IonTitle,IonSelectOption,
            IonToolbar,IonInput,
            IonItem,IonButton,
            CommonModule, FormsModule, RouterModule] 
})
export class RegisterPage  {

  email = '';
  password = '';
  isAdmin: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth, private firestore: Firestore
  ) {}

  
  async register() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const uid = userCredential.user.uid;
  
      await setDoc(doc(this.firestore, 'users', uid), {
        email: this.email,
        role: this.isAdmin ? 'admin' : 'user'
      });
  
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Error registering user: ' + err.message);
        console.error(err.message);
      } else {
        alert('An unknown error occurred during registration.');
        console.error(err);
      }
    }
  }
}