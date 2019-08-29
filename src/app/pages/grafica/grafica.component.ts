import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { GraficoService } from 'src/app/services/grafico.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: []
})
export class GraficaComponent implements OnInit, OnDestroy
{
    public lineChartData: Array<any> = 
    [
        { data: [65, 59, 80, 81, 56, 55, 40, 0, 0, 0, 0, 0], label: 'Ventas' }
    ];
    public lineChartLabels: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    public listen: Subscription = new Subscription();

    public ventaForm: FormGroup;
    
    public constructor(private http: HttpClient, private socket: WebsocketService, private fb: FormBuilder, private grafico: GraficoService)
    {

    }

    public ngOnInit()
    {
        this.ventaForm = this.fb.group
        ({
            mes: new FormControl('Enero'),
            monto: new FormControl(0)
        });

        this.GetData();
        this.UpdateChart();
    }

    public ngOnDestroy()
    {
        this.listen.unsubscribe();
    }

    public GetData()
    {
        this.http.get('http://localhost:69/api/grafica').subscribe
        (
            (data: Array<any>) => this.lineChartData = data
        );        
    }

    public UpdateChart()
    {
        this.listen = this.socket.Listen('UPDATE_CHART').subscribe
        (
            (data: Array<any>) => this.lineChartData = data
        );
    }

    public Submit()
    {
        if (!this.ventaForm.valid)
            return;

        this.grafico.SendVenta(this.ventaForm.value);
    }
}
