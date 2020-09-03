import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [{
  path: '',
  component: ProductsListComponent,
},
{
  path: 'about',
  component: AboutComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
