import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CardsComponent} from './components/cards/cards.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'cards', component: CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
