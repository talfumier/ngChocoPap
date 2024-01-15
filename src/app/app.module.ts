import { NgModule,LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from './products/card/card.component';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './product/product.component';
import { InputComponent } from './products/input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './products/select/select.component';
import { CounterComponent } from './cart/counter/counter.component';
import { AddRemoveComponent } from './cart/add-remove/addRemove.component';


registerLocaleData(localeFr); //register fr-FR locale, default is en-US

const routes:Routes=[
  {path:'',component:HomeComponent},  
  {path:'products',component:ProductsComponent},  
  {path:'product/:id',component:ProductComponent},
  {path: '**', component: NotFoundComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ProductsComponent,
    CardComponent,
    ProductComponent,
    InputComponent,
    SelectComponent,
    CounterComponent,
    AddRemoveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   
    FormsModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),  
  	ToastrModule.forRoot({ timeOut: 3000 })
  ],
  providers: [
    ProductsService,
    { provide: LOCALE_ID, useValue: 'fr-FR'}  //reset default locale to fr-FR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
