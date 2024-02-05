import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { productsResolver } from './services/firebase.service';

const routes:Routes=[
  {path:'',component:HomeComponent},  
  {path:'products',component:ProductsComponent,resolve:{products:productsResolver}},  
  {path:'product/:id',component:ProductComponent,resolve:{products:productsResolver}},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
