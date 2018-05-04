import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimRamComponent } from './sim-ram/sim-ram.component';
import { SimRam8Component } from './sim-ram8/sim-ram8.component';

@NgModule({
  declarations: [
    AppComponent,
    SimRamComponent,
    SimRam8Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
