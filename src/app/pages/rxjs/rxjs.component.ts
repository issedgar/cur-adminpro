import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
    .pipe( retry( 2 ) ) // si requiero reintentos
    .subscribe(
      numero => { console.log('Subs ', numero); },
      error => console.error('Error obser', error),
      () => console.log('El observador termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;
        // contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        if (contador === 12) {
          clearInterval( intervalo );
          observer.complete();
        }

        /*
        if (contador === 2) {
          clearInterval( intervalo );
          observer.error('Esto es un error');
        }
        */

      } , 1000);

    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {

        if ( (valor % 2) === 1 ) {
          // par
          return true;
        } else {
          // impar
          return false;
        }
      })
    );

    /**
    }).pipe(
      map( resp => {
        return resp.valor;
      })
    ); */
  }




}
