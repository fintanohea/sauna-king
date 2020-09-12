import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AboutComponent } from './components/about/about.component';
import { SteamcubeProductComponent } from './components/steamcube-product/steamcube-product.component';

const routes: Routes = [{
  path: '',
  component: ProductsListComponent,
},
{
  path: 'about',
  component: AboutComponent,
},
{
  path: 'steamcube',
  component: SteamcubeProductComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
