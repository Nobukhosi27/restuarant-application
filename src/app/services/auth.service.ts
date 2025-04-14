import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { User } from 'src/shared/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => 
        getDoc(doc(this.firestore, 'users', user.uid))
          .then(userDoc => {
            if (!userDoc.exists()) throw new Error('User data not found');
            return { uid: user.uid, ...userDoc.data() } as User;
          })
      );
  }

  
  logout() {
    return signOut(this.auth);
  }

  
  getCurrentUser() {
    const user = this.auth.currentUser; 
    if (user) {
      return getDoc(doc(this.firestore, 'users', user.uid))
        .then(userDoc => {
          if (userDoc.exists()) {
            return { uid: user.uid, ...userDoc.data() } as User; 
          } else {
            throw new Error('User data not found');
          }
        });
    }
    return Promise.reject('No user is logged in');
  }
}