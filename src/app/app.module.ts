import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { BoardComponent } from './components/board/board.component';
import { ConfettiComponent } from './components/confetti/confetti.component';
import { FlipNumberComponent } from './components/flip-number/flip-number.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ConfettiComponent,
    FlipNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(environment.socket)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
