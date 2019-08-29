import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy
{
    public texto: string;
    public mensajes: Array<any>;
    public listen: Subscription;
    public elemento: HTMLElement;

    public constructor(private socket: WebsocketService)
    {
        this.mensajes = new Array<any>();
        this.listen = new Subscription();
    }

    public ngOnInit()
    {
        this.listen = this.socket.Listen('MESSAGE_FOR_ALL').subscribe
        (
            payload =>
            {
                this.mensajes.push(payload);

                this.elemento = document.getElementById('chat-mensajes');
                setTimeout(() => { this.elemento.scrollTop = this.elemento.scrollHeight; }, 50);
            }
        );
    }

    public ngOnDestroy()
    {
        this.listen.unsubscribe();
    }

    public EnviarMensaje() : void
    {
        if (this.texto.trim().length === 0)
            return;

        const payload =
        {
            de: this.socket.GetUser().nombre,
            cuerpo: this.texto
        };

        this.socket.Emit('NEW_MESSAGE', payload);

        this.texto = '';
    }
}