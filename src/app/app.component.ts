import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy
{
    title = 'basico';
    public listen: Subscription;

    public constructor(private socket: WebsocketService)
    {

    }

    public ngOnInit()
    {
        this.listen = this.socket.Listen('MESSAGE_PRIVATE').subscribe
        (
            payload =>
            {
                console.log('[payload] MESSAGE_PRIVATE', payload);
            }
        );
    }

    public ngOnDestroy()
    {
        this.listen.unsubscribe();
    }
}
