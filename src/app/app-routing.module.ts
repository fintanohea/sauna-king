import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AboutComponent } from './components/about/about.component';
import { SteamcubeProductComponent } from './components/steamcube-product/steamcube-product.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [{
  path: '',
  component: HomepageComponent,
},
{
  path: 'about',
  component: AboutComponent,
},
{
  path: 'steamcube',
  component: SteamcubeProductComponent,
},
{
  path: 'contact',
  component: ContactFormComponent,
},
{
  path: 'store',
  component: ProductsListComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
