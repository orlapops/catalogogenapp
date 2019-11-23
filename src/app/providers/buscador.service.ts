import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {MenuController } from '@ionic/angular';
import { NetsolinApp } from '../shared/global';
// import {URL_SERVICIOS} from "../../config/url.servicios";
import 'rxjs/add/operator/toPromise';

//Firebase Oct 4 18
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ParEmpreService } from './par-empre.service';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  
  items: Observable<any[]>;
  getDoc:any;
  seleccion_fb=true;
  imagen: any;
  start: any;

  constructor(public http: Http,
    public _parEmpreProv: ParEmpreService,
    private fbDb: AngularFirestore, private menuCtrl: MenuController,)  { }

  //Obtiene productos buscados por COLOR JM 14/11/2018

  buscar_color(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    
    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('color').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_color() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('color')).valueChanges();
  }


 //Obtiene productos buscados por NOMBRE JM 14/11/2018
  
  buscar_nombre(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    

    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('nombre').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_nombre() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('nombre')).valueChanges();
  }

 
  //Obtiene productos buscados por LINEA JM 14/11/2018
  
  buscar_linea(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    

    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('linea').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_linea() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('linea')).valueChanges();
  }

   //Obtiene productos buscados por COD_CATALOGO JM 14/11/2018
  
   buscar_codcatalogo(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    

    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('cod_catalogo').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_codcatalogo() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('cod_catalogo')).valueChanges();
  }

  //Obtiene productos buscados por SUB_TIPO JM 14/11/2018
  
   buscar_subtipo(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    

    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('sub_tipo').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_subtipo() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('sub_tipo')).valueChanges();
  }

  
  //Obtiene productos buscados por TIPO JM 14/11/2018
  
  buscar_tipo(start, end) {

    // this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    

    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('tipo').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_tipo() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('tipo')).valueChanges();
  }

   //Obtiene productos buscados por TIPO JM 14/11/2018
  
   buscar_version(start, end) {

    this.start=start;
    // console.log ("firequery")
    // console.log ("start: ",start)
    // console.log ("end: ",end)
    
    return this.fbDb.collection('armacatlcol', ref => ref.limit(4).orderBy('version').startAt(start).endAt(end)).valueChanges();

  }
  
  getall_items_version() {

    return this.fbDb.collection('armacatlcol', ref => ref.orderBy('version')).valueChanges();
  }
 

}

