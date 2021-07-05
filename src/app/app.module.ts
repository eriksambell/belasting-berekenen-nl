import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

// Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeroComponent } from "./components/hero/hero.component";
import { ResultsComponent } from "./components/results/results.component";
import { ContentComponent } from "./components/content/content.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { DisclaimerComponent } from "./components/disclaimer/disclaimer.component";

// Language
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDutch from "@angular/common/locales/nl";
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
    DisclaimerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "nl-NL" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
