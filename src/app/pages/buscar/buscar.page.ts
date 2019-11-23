import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { BuscadorService } from '../../providers/buscador.service';
import { ParEmpreService } from '../../providers/par-empre.service';
import { ProductosService } from '../../providers/productos.service';
import { ProductoPage } from '../producto/producto.page';
import { DomSanitizer } from '@angular/platform-browser';

import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  buscar_item:string;

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  all_items: any;
  items: any;
  q: any;


  constructor(public _bs: BuscadorService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public _DomSanitizer: DomSanitizer,
              public _parEmpreProv: ParEmpreService,
              public _ps: ProductosService) { }

  ngOnInit() {

  
 

  //Obtiene productos buscados por Color JM 14/11/2018
    this._bs.getall_items_color().subscribe((items) => {
      this.all_items = items;
    })
    // Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_color(value[0], value[1]).subscribe((items) => {
        console.log("items_color",items)
        if (items.length!=0){
          this.items = items;

        }
      })

    })
  
 //Obtiene productos buscados por Nombre JM 14/11/2018
    this._bs.getall_items_nombre().subscribe((items) => {
      this.all_items = items;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_nombre(value[0], value[1]).subscribe((items) => {
        console.log("items_nombre",items)
        if (items.length!=0){
          this.items = items;
        }
      })

    })

  //Obtiene productos buscados por Linea JM 14/11/2018
    this._bs.getall_items_linea().subscribe((items) => {
      this.all_items = items;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_linea(value[0], value[1]).subscribe((items) => {
        console.log("items_linea",items)
        if (items.length!=0){
          this.items = items;
        }
      })

    })

  //Obtiene productos buscados por cod_catalogo JM 14/11/2018
  this._bs.getall_items_codcatalogo().subscribe((items) => {
    this.all_items = items;
  })
  combineLatest(this.startobs, this.endobs).subscribe((value) => {
    this._bs.buscar_codcatalogo(value[0], value[1]).subscribe((items) => {
      console.log("cod_catalogo",items)
      if (items.length!=0){
        this.items = items;
      }
    })

  })

    //Obtiene productos buscados por sub_tipo JM 14/11/2018
    this._bs.getall_items_subtipo().subscribe((items) => {
      this.all_items = items;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_subtipo(value[0], value[1]).subscribe((items) => {
        console.log("sub_tipo",items)
        if (items.length!=0){
          this.items = items;
        }
      })
  
    })

    
    //Obtiene productos buscados por tipo JM 14/11/2018
    this._bs.getall_items_tipo().subscribe((items) => {
      this.all_items = items;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_tipo(value[0], value[1]).subscribe((items) => {
        console.log("tipo",items)
        if (items.length!=0){
          this.items = items;
        }
      })
  
    })

     //Obtiene productos buscados por tipo JM 14/11/2018
     this._bs.getall_items_version().subscribe((items) => {
      this.all_items = items;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this._bs.buscar_version(value[0], value[1]).subscribe((items) => {
        console.log("version",items)
        if (items.length!=0){
          this.items = items;
        }
      })
  
    })





  }

  //Detecta la palabra que se coloca en el ionic-input JM 14/11/2018
  buscar_productos($event){

    this.q = $event.target.value;
      if (this.q != '') {
        this.startAt.next(this.q);
        this.endAt.next(this.q + "\uf8ff");
      }
      else {
        this.items = this.all_items;
      }
  }

 
}
