import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {

    this.getDataRoter().subscribe( data => {
      // console.log( data );
      this.titulo = data.titulo;
      this._title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this._meta.updateTag(metaTag);


    });
   }

  ngOnInit() {
  }

  getDataRoter() {
    return this._router.events.pipe(

      filter( evento =>  evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) =>  evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )

    );
  }

}
