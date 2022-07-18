import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: 'profile',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'my-message',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./create-message/create-message.module').then(
            (m) => m.CreateMessageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
