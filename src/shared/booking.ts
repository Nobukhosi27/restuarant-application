import { Timestamp } from "firebase/firestore";

export interface Booking {
  id: string; 
  userId: string;
  restaurantId: string;
  restaurantName: string;
  dateTime: Timestamp;  
  guests: number;
  status: string;
   
  }