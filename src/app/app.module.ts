import { NgModule,LOCALE_ID,isDevMode, ErrorHandler} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { provideFirebaseApp,initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { GenericErrorHandler } from './error/errorHandler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from './products/card/card.component';
import { ProductComponent } from './product/product.component';
import { InputComponent } from './products/input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './products/select/select.component';
import { CounterComponent } from './cart/counter/counter.component';
import { AddRemoveComponent } from './cart/add-remove/addRemove.component';
import { PopupComponent } from './cart/popup/popup.component';
import { ModalComponent } from './modal/modal.component';
import { environment } from '../config/environment';

registerLocaleData(localeFr); //register fr-FR locale, default is en-US

const firebaseConfig = {
  apiKey:environment.firebaseApiKey,
  authDomain: "ngchocopap-6bb40.firebaseapp.com",
  databaseURL: "https://ngchocopap-6bb40-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ngchocopap-6bb40",
  storageBucket: "ngchocopap-6bb40.appspot.com",
  messagingSenderId: "847927763948",
  appId: "1:847927763948:web:6211078c023ae7fad456c9"
};
console.log(environment.firebaseApiKey)
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
    PopupComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   
    FormsModule,
    AppRoutingModule, 
  	ToastrModule.forRoot({ timeOut: 3000 }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GenericErrorHandler },
    { provide: LOCALE_ID, useValue: 'fr-FR'},  //reset default locale to fr-FR
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
