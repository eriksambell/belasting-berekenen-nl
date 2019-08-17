import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { ResultsComponent } from './results/results.component';
import { ContentComponent } from './content/content.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDutch from '@angular/common/locales/nl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localeDutch);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ResultsComponent,
    ContentComponent,
    PrivacyComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-NL' }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
