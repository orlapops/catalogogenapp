import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from "@ionic/angular";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

@Injectable({providedIn: 'root'})
export class CarritoService {
 
  items:any[]=[]; //FUNCIONA
  total_pares:number = 0;

  constructor(public http: Http,
              private alertController:AlertController,
              private platform: Platform,
              public modalController:ModalController,
              private storage:Storage ){ 
    this.cargar_storage();
    this.actualizar_total();
  }
    
  remove_item( idx:number ){
    this.items.splice(idx,1);
    this.actualizar_total();
    this.guardar_storage();
  }

  async agregar_carrito(item:any){
    var repetido = false;
    this.items.forEach(prod =>{
      if (item.color == prod.color && item.linea == prod.linea ){
        repetido = true;
        item.curvas.forEach(curva => {
          if(curva.cantidad > 0){
            var enc = false
            prod.curvas.forEach(c => {
              if(c.curva == curva.curva){
                c.cantidad += curva.cantidad;
                enc = true;
              }              
            });
            if(!enc){
              prod.curvas.push(curva);
            }
          }
        });
        item.tallas.forEach(talla => {
          if(talla.cantidad > 0){
            var enc = false
            prod.tallas.forEach(t => {
              if(t.talla == talla.talla){
                t.cantidad += talla.cantidad;
                enc = true;
              }              
            });
            if(!enc){
              prod.tallas.push(talla);
            }
          }
        });
        prod.t_curvas += item.t_curvas;
        prod.t_tallas += item.t_tallas;
        prod.t_pares += item.t_pares;
      }
    })
    if(!repetido){
      console.log("holi si entre");
      this.items.push(item);
      const alert = await this.alertController.create({
        header: 'Item agregado exitosamnete',
        subHeader: item.color,
        message: "Se añadio el nuevo item",
        buttons: ["OK"]
      });
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Item existente',
        subHeader: item.color,
        message: "Se sumo mas unidades al item",
        buttons: ["OK"]
      });
      await alert.present();
    }    
    this.actualizar_total();
    this.guardar_storage();
  }


  actualizar_total(){

    this.total_pares = 0;
    for( let item of this.items ){  
      this.total_pares += Number(item.t_pares);
    }
    console.log ("total_carrito:",this.total_pares)
  }


  private guardar_storage(){

    if( this.platform.is("cordova") ){
      // dispositivo
      this.storage.set('items', this.items );
      this.storage.set('pares', this.total_pares);
      
    }else{
      // computadora
      localStorage.setItem("items", JSON.stringify( this.items ) );
      localStorage.setItem("pares", JSON.stringify( this.total_pares ) );
    }


  }

  // CARGAR STORAGE ITEMS JM25102018
  cargar_storage(){
    let promesa = new Promise( ( resolve, reject )=>{
      if( this.platform.is("cordova") ){
        this.storage.ready().then( ()=>{
          this.storage.get("items").then( items =>{
            if( items ){
              this.items = items;
            }            
          })
          this.storage.get("pares").then( pares =>{
            if( pares ){
              this.total_pares = pares;
            }            
          })
          resolve();
        })   
      }else{
        //computadora
        if( localStorage.getItem("items") ){
          this.items = JSON.parse( localStorage.getItem("items")  );
        }
        if( localStorage.getItem("pares") ){
          this.total_pares = JSON.parse( localStorage.getItem("pares")  );
        }
        resolve();
      }

    });
    return promesa;
  }
  public borrar_storage() {
    this.items = [];
    this.total_pares = 0;
    if (this.platform.is("cordova")) {
      // dispositivo
      this.storage.remove("items");
      this.storage.remove("pares");
    } else {
      // computadora
      localStorage.removeItem("items");
      localStorage.removeItem("pares");
    }
  }

}
