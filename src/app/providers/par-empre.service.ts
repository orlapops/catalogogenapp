import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage,  AngularFireStorageReference } from '@angular/fire/storage';

import { Observable } from 'rxjs';
// import { Http } from '@angular/http';
// import { map, filter, switchMap } from 'rxjs/operators';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { NetsolinApp } from '../shared/global';
// import {URL_NETSOLIN} from "../config/url.servicios";

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ParEmpreService {
  DEPURANDO = true;
  public datosEmpre: any = {};
  parEmpre: any = {};
  usuario: any={};
  usuario_valido=false;
  permite_pedido = false;
  
  menerror_usuar="";
  // private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  URL_SERVICIOS: string ="";
  idreglog = 'depuracion1';
  idcatalogo = null;

  constructor(
    private afDB: AngularFirestore,
    private platform: Platform,
    private storage: Storage,
    // public http: Http
    private http: HttpClient
    // public http: Http

  ) {

  }

  reg_log(titulo, mensaje){
    const fd = new  Date();
    // const fds = fd.toISOString();
    const id = fd.toLocaleString().replace(/[/]/g, '-');
    // fd.getFullYear().toString()+fd.getMonth().toString()+fd.getDay().toString()+fd.toLocaleTimeString();
    this.afDB
    .collection(`/log/depura1/dos`)
    .doc(id)
    .set({fecha: id, titulo: titulo, mensaje: mensaje});
  }

  guardarUsuarioStorage(data) {
    return new Promise( (resolve, reject) => {
      this.usuario = data;
      if ( this.platform.is('cordova')  ){
        this.storage.set('net_usuario',data);
        resolve(true);
      } else {
        // Escritorio
        localStorage.setItem('net_usuario', JSON.stringify(data));
        resolve(true);
      }
    });
  }

  cargarUsuarioStorage() {
    return new Promise( (resolve, reject) => {
      if ( this.platform.is('cordova')  ){  
        this.storage.get('net_usuario').then( val => {
          if ( val ) {
            this.usuario = val;
            resolve(true);
          }else {
            resolve(false);
          }
        });        
      } else {
        if ( localStorage.getItem('net_usuario')){
          this.usuario = JSON.parse( localStorage.getItem("net_usuario"));
          resolve(true);
        }else {
          resolve(false);
        }        
      }
    });
  }


  borrarUsuarioStorage() {
    this.usuario = null;
    if ( this.platform.is('cordova') ) {
      this.storage.remove('net_usuario');
    }else {
      localStorage.removeItem('net_usuario');
    }
  }

  usuarioFB(email: string){
    this.afDB.collection(
      'usuarios', cod => 
                     cod.where('Email', '==', email))
                        .valueChanges()
                        .subscribe((user) => 
                          {
                            this.usuario=user;
                            this.guardarUsuarioStorage(user);
                            console.log("Curvas en Firebase:",user);
                          },
                  
                          (err)=>{ console.log("Error en el data de Fb", err) }
                          );  
  }

   //Verifica usuario actual en firebase si no existe la crea
 public VeriUsuarioaActualFb(idusuar){
	return new Promise( (resolve) => {
	console.log(idusuar,resolve);
	const ref: AngularFirestoreDocument<any> = this.afDB.collection(`users`).doc(idusuar);
	ref.get().subscribe(snap => {
    console.log('validar usuario: ',snap);
		if (snap.exists) {
			console.log('Existe usuario', idusuar);
			// this.fbDb.collection(`/clientes`)
			// .doc(id).update({datosoapp: this.oappNetsolin});
			resolve(true);
		} else {
			console.log('no existe usuario',idusuar);
			resolve(false);
		}
	});
});
}
      //Se suscribe a empresa para traerla de FB
			public getUsuarFB(Id: string) {
				console.log('en getUsuarFB Id:',Id);
			return this.afDB
				.collection(`users`)
			 .doc(Id).valueChanges();
			}
            //Se suscribe a datos empresa
            public getEmpresaFB(Id: string) {
              console.log('en getEmpresaFB Id:',Id);
            return this.afDB
              .collection(`clientes`)
             .doc(Id).valueChanges();
            }
      
//sERVICIOS COMO FUNCIONES DE LIBRERIA ADICIONALES A JS
//COMPLETA UNA CADENA CON 0 A LA IZQUIERDA DE NUMERO Y LONGITUD DADA

 zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */ 
  var zero = "0"; /* String de cero */  
  
  if (width <= length) {
      if (number < 0) {
           return ("-" + numberOutput.toString()); 
      } else {
           return numberOutput.toString(); 
      }
  } else {
      if (number < 0) {
          return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
      } else {
          return ((zero.repeat(width - length)) + numberOutput.toString()); 
      }
  }
}
//cadena formato AAAAMMDD A FECHA TIEMPO 0
cadafecha(cfecha){
  let ano = cfecha.slice(0,4);
  let mes = cfecha.slice(4,6);
  let dia = cfecha.slice(6,8);

  let dfecha = new Date(ano,mes,dia,0,0,0);
  return dfecha;
}

//recibe hora militar como numero y retorna cadena formato HH:MM AM/PM
cadhoramil(nhora){
  let ch = nhora.toString();
  let chh = '';
  let cmm = '';
  let campm = '';
  let nnh = 0;
  if (nhora < 1000) {
    chh = ch.slice(0,1);
    cmm = ch.slice(1,3); 
  } else {
    chh = ch.slice(0,2);
    cmm = ch.slice(2,4);  
  }
  if(nhora < 1200){
    campm = 'AM';      
  } else {
    nnh = parseInt(chh) - 12;
    chh = nnh.toString();
    campm = 'PM';      
  }

  return chh+':'+cmm+' '+campm;
}

}
