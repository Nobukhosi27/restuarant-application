export interface Review {
    id?: string;
    userId: string;
    restaurantId: string;
    restaurantName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  