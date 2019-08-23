import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignerComponent} from "./signer/signer.component";


const routes: Routes = [
  {
    path: '',
    component: SignerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
