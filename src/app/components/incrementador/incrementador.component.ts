import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [ ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() incrementador: EventEmitter<number>;

  constructor() {
    this.incrementador = new EventEmitter();
  }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    // const elemHTML: any = document.getElementsByName('progreso')[0];
    if (newValue > 100)  {
      this.progreso = 100;
    } else if ( newValue == null || newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.incrementador.emit( this.progreso );
  }

  cambiarValor(value: number) {
    if ((value > 0 && this.progreso >= 100) || (value < 0 && this.progreso <= 0))  {
      return;
    }
    this.progreso = this.progreso + value;
    this.incrementador.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

}
