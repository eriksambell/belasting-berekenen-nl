import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { DisclaimerComponent } from "./components/disclaimer/disclaimer.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "privacy-policy", component: PrivacyComponent },
  { path: "disclaimer", component: DisclaimerComponent },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
