import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
 
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '', 
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  
  {
    path: 'restuarantlist',
    loadComponent: () => import('./pages/restuarantlist/restuarantlist.page').then( m => m.RestuarantlistPage)
  },
  {
    path: 'create-booking',
    loadComponent: () => import('./bookings/create-booking/create-booking.page').then( m => m.CreateBookingPage)
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./bookings/my-bookings/my-bookings.page').then( m => m.MyBookingsPage)
  },
  {
    path: 'restuarant-details/:restaurantId',
    loadComponent: () => import('./pages/restuarant-details/restuarant-details.page').then( m => m.RestuarantDetailsPage)
  },
  {
    path: 'admin-reviews',
    loadComponent: () => import('./pages/admin-reviews/admin-reviews.page').then( m => m.AdminReviewsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'booking-history',
    loadComponent: () => import('./pages/booking-history/booking-history.page').then( m => m.BookingHistoryPage)
  },
  { path: '', 
    redirectTo: '/profile', 
    pathMatch: 'full' },   {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage)
  },
  {
    path: 'side-menu',
    loadComponent: () => import('./pages/side-menu/side-menu.page').then( m => m.SideMenuPage)
  },
  {
    path: 'manage-restuarants',
    loadComponent: () => import('./pages/manage-restuarants/manage-restuarants.page').then( m => m.ManageRestuarantsPage)
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('./pages/user-dashboard/user-dashboard.page').then( m => m.UserDashboardPage)
  },
  {
    path: 'manage-bookings',
    loadComponent: () => import('./pages/manage-bookings/manage-bookings.page').then( m => m.ManageBookingsPage)
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/reviews/reviews.page').then( m => m.ReviewsPage)
  }

];
