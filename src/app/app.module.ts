import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignerComponent } from './signer/signer.component';

export function getWindow() { return window; }

@NgModule({
  declarations: [
    AppComponent,
    SignerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: 'window', useFactory: getWindow}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
