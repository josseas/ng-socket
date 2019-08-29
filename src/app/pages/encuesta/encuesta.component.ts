import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: []
})
export class EncuestaComponent implements OnInit, OnDestroy
{
    public barChartLabels: Array<string> = ['Alternativa. 1', 'Alternativa. 2', 'Alternativa. 3', 'Alternativa. 4'];
    public barChartLegend = true;
    public barChartData: Array<any> = 
    [
        { data: [28, 48, 40, 19], label: 'Femenino' },
        { data: [65, 59, 80, 81], label: 'Masculino' }
    ];

    public alt: Array<any> = 
    [
        { nombre: 'Alternativa. 1', key: 0 },
        { nombre: 'Alternativa. 2', key: 1 },
        { nombre: 'Alternativa. 3', key: 2 },
        { nombre: 'Alternativa. 4', key: 3 }
    ];

    public listen: Subscription = new Subscription();

    public encuestaForm: FormGroup;
  
    public constructor(private http: HttpClient, private socket: WebsocketService, private fb: FormBuilder, private encuesta: EncuestaService) 
    {

    }

    public ngOnInit() 
    {
        this.encuestaForm = this.fb.group
        ({
            alternativa: new FormControl(0),
            sexo: new FormControl('F')
        });
        
        this.GetData();
        this.UpdateSurvey();
    }

    public ngOnDestroy() 
    {
        this.listen.unsubscribe();
    }

    public GetData()
    {
        this.http.get('http://localhost:69/api/encuesta').subscribe
        (
            (data: Array<any>) => this.barChartData = data
        );        
    }

    public UpdateSurvey()
    {
        this.listen = this.socket.Listen('UPDATE_SURVEY').subscribe
        (
            (data: Array<any>) => this.barChartData = data
        );
    }

    public Submit()
    {
        if (!this.encuestaForm.valid)
            return;

        this.encuesta.SendEncuesta(this.encuestaForm.value);
    }
}
