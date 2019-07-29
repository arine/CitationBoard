import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  public updates = this.socket.fromEvent< Citation[] >('updates');

  constructor(private socket: Socket) { }

  requestInit() {
    this.socket.emit('init');
  }
}

interface Citation {
  id: number;
  value: number;
}
