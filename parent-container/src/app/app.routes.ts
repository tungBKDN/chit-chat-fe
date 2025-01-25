import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: 'messaging',
      loadChildren: () =>
         import('messaging/Module').then((m) => m.MessagingModule),
   },
   {
      path: 'user-general',
      loadChildren: () =>
         import('user-general/Module').then((m) => m.UserGeneralModule),
   },
   { path: '', redirectTo: 'user-general', pathMatch: 'full' },
];
