import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';


const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
