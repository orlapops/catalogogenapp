import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/walkthrough/walkthrough.module#WalkthroughPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'support', loadChildren: './pages/support/support.module#SupportPageModule' },
  { path: 'wait', loadChildren: './pages/wait/wait.module#WaitPageModule' },
  // { path: 'por-categoria/:id', loadChildren: './pages/por-categoria/por-categoria.module#PorCategoriaPageModule' },
  { path: 'por-categoria', loadChildren: './pages/por-categoria/por-categoria.module#PorCategoriaPageModule' },
  { path: 'por-subtipo/:id/:nivel/:linknivant', loadChildren: './pages/por-subtipo/por-subtipo.module#PorSubtipoPageModule' },
  { path: 'por-subcategoria', loadChildren: './pages/por-subcategoria/por-subcategoria.module#PorSubcategoriaPageModule' },
  { path: 'shopping-detail/:itemId', loadChildren: './pages/shopping-detail/shopping-detail.module#ShoppingDetailPageModule' },
  { path: 'producto', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'curva', loadChildren: './pages/curva/curva.module#CurvaPageModule' },
  { path: 'talla', loadChildren: './pages/talla/talla.module#TallaPageModule' },
  { path: 'carrito', loadChildren: './pages/carrito/carrito.module#CarritoPageModule' },
  { path: 'historial', loadChildren: './pages/historialped/historial.module#HistorialPageModule' },
  { path: 'buscar', loadChildren: './pages/buscar/buscar.module#BuscarPageModule' },
// { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  // { path: 'message/:id', loadChildren: './pages/message/message.module#MessagePageModule' },
  { path: 'location', loadChildren: './pages/modal/location/location.module#LocationPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
