import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {MenuController } from '@ionic/angular';
import { NetsolinApp } from '../shared/global';
import 'rxjs/add/operator/toPromise';

//Firebase Oct 4 18
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';

//Import Storage JM 15/11/2018
import * as firebase from 'firebase';
import { ParEmpreService } from './par-empre.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  pagina:number=0;
  productos_todos: any[]=[];
  productos_todos_fb: any[]=[];

  catalogo:any[]=[];
  categoria:any[]=[];
  subtipos:any[]=[];
  subcategoria:any[]=[];
  producto:any[]=[];

  curva:any[]=[];
  tabla_curva:any[]=[];

  talla:any[]=[];
  cargo_productos = false;
  id_categoria:any[]=[];
  resultados:any[] = [];

  
  //ITEM FIREBASE
  items: Observable<any[]>;
  getDoc:any;
  seleccion_fb=true;
  imagen: any;
  start: any;
  imageSource;
  
  catalogo_act = '';
  linea_act = '';
  lineacolor_act = '';
 
  //public paramtipoprod: any = {categoria:0}
  constructor(public http: Http,
    public _parEmpreProv: ParEmpreService,
    private afStorage: AngularFireStorage,
    public _DomSanitizer: DomSanitizer,
    private fbDb: AngularFirestore, private menuCtrl: MenuController,) 
  {
    // this.cargar_todos(); //Caragar todos los productos
    // this.cargar_lineas();//Cargar las categorias
    // this.obtenerImagenFB();  
  }



//SERVICIOS CON CONEXION A NETSOLIN Y FIREBASE JM 10/10/2018--------------------------------

  //Cargar el catalogo valido para el usuario actual 
  cargar_catalogo() 
   {
    return new Promise( (resolve, reject) => {          
      console.log ("ESTA EN FIREBASE: cargar_catalogo() version: ",this._parEmpreProv.usuario.version_catalogo);
      // this.fbDb.collection('catalogos').valueChanges()
      const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'
      console.log(idcollection,this._parEmpreProv.datosEmpre);
      this.fbDb.collection(idcollection, cod => 
        cod.where('version','==', this._parEmpreProv.usuario.version_catalogo)).valueChanges()
        .subscribe((data_categoria: any) => 
      {        
        console.log("DATA CATEGORIA FIREBASE", data_categoria)
        this.catalogo=data_categoria;
        this._parEmpreProv.idcatalogo = data_categoria[0].id;
        console.log("Catalogo en Fb",this.catalogo,this._parEmpreProv.idcatalogo);
        resolve(true);
      },
      (err)=>{ console.log("Error en el data de Fb", err) 
          resolve(false);}    
      );
   
      }); 
  }

    //Cargar nivel 1 definido en el catalogo
    cargar_nivel1() 
    {
     return new Promise( (resolve, reject) => {          
       console.log ("ESTA EN FIREBASE: cargar_lineas() version: ",this._parEmpreProv.usuario.version_catalogo);
       // this.fbDb.collection('catalogos').valueChanges()
       const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'+this._parEmpreProv.idcatalogo+'/nivel1/';
       console.log(idcollection,this._parEmpreProv.datosEmpre);
       this.fbDb.collection(idcollection, cod => 
         cod.where('version','==', this._parEmpreProv.usuario.version_catalogo)).valueChanges()
         .subscribe((data_categoria) => 
       {        
         console.log("DATA CATEGORIA FIREBASE", data_categoria)
         this.categoria=data_categoria;
         console.log("Catalogos en Fb",this.categoria)
         resolve(true);
       },
       (err)=>{ console.log("Error en el data de Fb", err) 
           resolve(false);}    
       );
    
       }); 
   }
 
  //Cargar todos los catalogos de Viatropical   
  cargar_lineas() 
   {
    return new Promise( (resolve, reject) => {          
      console.log ("ESTA EN FIREBASE: cargar_lineas() version: ",this._parEmpreProv.usuario.version_catalogo);
      // this.fbDb.collection('catalogos').valueChanges()
      const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'
      console.log(idcollection,this._parEmpreProv.datosEmpre);
      this.fbDb.collection(idcollection, cod => 
        cod.where('version','==', this._parEmpreProv.usuario.version_catalogo)).valueChanges()
        .subscribe((data_categoria) => 
      {        
        console.log("DATA CATEGORIA FIREBASE", data_categoria)
        this.categoria=data_categoria;
        console.log("Catalogos en Fb",this.categoria)
        resolve(true);
      },
      (err)=>{ console.log("Error en el data de Fb", err) 
          resolve(false);}    
      );
   
      }); 
  }

// Actualiza url firestorage en Netsolin, para cuando se traiga sea màs rapido
guardarpedidoFb(cod_tercer, id, objpedido) {
        // console.log('en grabar guardarpedidoFb coleccion: ',`/personal/${this._parempre.usuario.cod_usuar}
        // /rutas/${this._visitas.visita_activa_copvdet.id_ruta}/periodos/${this._visitas.id_periodo}
        // /visitas/${this._visitas.visita_activa_copvdet.id_visita}/pedidos`);
    return this.fbDb.collection(`/pedidos/`).doc(id).set(objpedido);
        // return this.fbDb
        // tslint:disable-next-line:max-line-length
        // .collection(`/personal/${this._parempre.usuario.cod_usuar}/rutas/${this._visitas.visita_activa_copvdet.id_ruta}/periodos/${this._visitas.id_periodo}/visitas/${this._visitas.visita_activa_copvdet.id_visita}/pedidos`)
        // .doc(id).set(objpedido);
        // .collection(`/personal/${this._parempre.usuario.cod_usuar}/rutas/${this._visitas.visita_activa_copvdet.id_ruta}/periodos/${this._visitas.id_periodo}/visitas/${this._visitas.visita_activa_copvdet.id_visita}/pedidos`)
        // .doc(id).set(objpedido);
}
  
  //Cargar todos los productos de Viatropical
  cargar_todos ()
  {
      console.log ("ESTA EN FIREBASE:  cargar_todos () version usuario:",this._parEmpreProv.usuario.version_catalogo)
      // this.fbDb.collection('catalogos').valueChanges()      
      let promesa=new Promise((resolve,reject)=>{
        const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'
        console.log(idcollection,this._parEmpreProv.datosEmpre);
        this.fbDb.collection(idcollection, cod => 
            cod.where('version','==', this._parEmpreProv.usuario.version_catalogo))                        
            .valueChanges()        
          .subscribe((data_producto) => 
          {
            
            console.log("DATA PRODUCTO FIREBASE carga todos", data_producto)
            let nuevaData = this.agrupar(data_producto, 2 );
            // console.log("NUEVA DATA", nuevaData)

            this.productos_todos.push( ...nuevaData );
            // console.log("Productos_todos_push",this.productos_todos)
            this.pagina +=1;
  
            resolve();
          },
  
          (err)=>{ console.log("Error en el data de Fb", err) }
        
          );
      
        });
        return promesa;
  }

//Traer un catalogo de fb 
  public get_catalogo(id){
      return this.fbDb
      .collection(`/catalogo`)
      .doc(id).valueChanges();
  }

//Traer nivel 1 
public get_nivel1(){
  const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'+this._parEmpreProv.idcatalogo+'/nivel1/';
  console.log(idcollection);
return this.fbDb
  .collection(idcollection).valueChanges();
}

//Traer otros niveles
public get_xnivel(pnivel: number,pid: string,plinknivant: string){
  var idcollection = plinknivant+'/nivel'+pnivel.toString()+'/';
//   for (var _i = 1; _i <= pnivel; _i++) {
//     idcollection += '/nivel'+_i.toString()+'/'+pid;
//     console.log(idcollection);
// }
  // '/nivel1/'+pid+'/nivel'+pnivel.toString()+'/';
  console.log('get nivel ',pnivel,pid,idcollection);
return this.fbDb
  .collection(idcollection).valueChanges();
}

//Traer otros niveles implementas asincronica usar pipe | sync
public get_xnivels(pnivel: number,pid: string,plinknivant: string){
  var idcollection = plinknivant+'/nivel'+pnivel.toString()+'/';
  console.log('get nivel ',pnivel,pid,idcollection);
return this.fbDb
  .collection(idcollection)
  .snapshotChanges().pipe(
    map(actions => {  
      return actions.map(async a => {
        const data: any = a.payload.doc.data();
        var precio = data.price;
        //traer precio
        // get id from firebase metadata 
        // await this.getprecio(data.id).subscribe(res =>{
        //   console.log(res);
        //     precio = res.precio;
        // });
        const id = a.payload.doc.id; 
        return { id, ...data };
      });
    })
  );
}

// public getprecio(pid){
//   const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/promociones/promo1/productos/'+pid.trim();
//   console.log(idcollection);
//   return this.fbDb.doc<any>(idcollection).valueChanges();

// }

getItemById(itemId: string){
  console.log("---> call getShoppingItemById()");
  const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/productos/'+itemId.trim();
  console.log(idcollection);
  return this.fbDb.doc<any>(idcollection).valueChanges();

}

getRelatedItem(categoryId: string, limit: number){
  console.log("_____START getItemByCatId()="+categoryId);
  // this.postDoc = this.afs.doc<Post>(`posts/${categoryId}`)
  // return this.postDoc.valueChanges()

  return this.fbDb.collection<any>('/shopping_item', ref => ref
  .where('shopping_categoryId', '==', categoryId)
  .orderBy("name", "desc").limit(limit))
  .snapshotChanges().pipe(
    map(actions => {  
      return actions.map(a => {
        const data = a.payload.doc.data();
        // get id from firebase metadata 
        const id = a.payload.doc.id; 
        return { id, ...data };
      });
    })
  );
}

  public get_subtipo(id){
    return this.fbDb
    .collection(`/subtipos`)
    .doc(id).valueChanges();
}

    //Cargar subtipos de un catalogo solo fb
    cargar_subtipos(categoria:string){
    
        console.log ("ESTA EN FIREBASE: cargar subtipo()")
        console.log ("Cod_catalogo Recibido:",categoria)
        this.fbDb.collection(
          'subtipos', cod => 
                          cod.where('cod_catalogo','==', categoria)).valueChanges()
                          .subscribe((data_subtipos) => 
                          {
                            console.log('llega de cargasr subtipos data_subtipos:',data_subtipos);
                            //console.log("DATA CATEGORIA FIREBASE", data)
                            this.subtipos=data_subtipos;
                            console.log("Linea en Firebase subtipos",this.subtipos);
                          },
                  
                          (err)=>{ console.log("Error en el data de Fb", err) }
                          );
    }
  
  //Cargar Lineas de Viatropical
  pedir_subcategoria(categoria:string,subtipo:string){
    
    if (this.seleccion_fb===true) //PEDIR SUBCATEGORIA EN FIREBASE JM 11/10/2018
    {
      console.log ("ESTA EN FIREBASE: pedir_subcategoria()");
      console.log ("Cod_catalogo Recibido:",categoria,this._parEmpreProv);
      this.fbDb.collection('armacatl', cod => 
          cod.where('cod_catalogo','==', categoria).where('sub_tipo','==',subtipo).where('version','==', this._parEmpreProv.usuario.Version))                        
          .valueChanges()
            .subscribe((data_subcategoria) => 
            {                          
              console.log("DATA CATEGORIA FIREBASE", data_subcategoria)
              // this.subcategoria=data_subcategoria;
              this.subcategoria=[];
              data_subcategoria.forEach((registro: any) => {
                //EVALUAR DE ACUERDO A CONDICIONES TIPO                
                if((this._parEmpreProv.usuario.ver_basicas && registro.tipo == 'BAS') ||
                (this._parEmpreProv.usuario.ver_stock && registro.tipo == 'STOC')){
                  // console.log('Asignar registro',registro);
                  this.subcategoria.push(registro);
                }                
              });
              console.log("Linea en Firebase",this.subcategoria);
            },                
          (err)=>{ console.log("Error en el data de Fb", err) }
        );
      }
      else //PEDIR SUBCATEGORIA EN NETSOLIN JM 11/10/2018
      {
        console.log ("ESTA EN NETSOLIN:pedir_subcategoria()")
        NetsolinApp.objenvrest.filtro = categoria;
        // console.log(" NetsolinApp.objenvrest.filtro");
        // console.log(categoria);
        let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=JAVARXSUBCAT&TIPO=0"
        // console.log('Entro a pedir subcategoria');
        // console.log(url);
        // console.log('Entro a pedir subcategoria 1');
        // console.log(NetsolinApp.objenvrest);
        // console.log('Entro a pedir subcategoria 2');
        this.http.post( url, NetsolinApp.objenvrest )
              .map (resp=> resp.json())
              .subscribe(data=>
                {
                  
                // console.log('Datos traer subcategoria');
                // console.log(data);
                this.subcategoria=data.tien_subcateg;
                console.log(this.subcategoria);
                
                if (data.error){
                //  console.log('data.error');
                //  console.log(data.error);
                }else{
        }
        })


      }
      

  }


 //Cargar linea-color según linea de Viatropical
  pedir_producto(cod_catalogo:string, linea:string,tipo:string,sub_tipo:string){

    if (this.seleccion_fb===true){ //PEDIR PRODUCTOS EN FIREBASE JM 11/10/2018
      console.log ("ESTA EN FIREBASE: Pedir_Producto ()")
      console.log ("Parametros recibidos",cod_catalogo,linea,tipo,sub_tipo)
      this.fbDb.collection(
        'armacatlcol', cod => 
                       cod.where('cod_catalogo', '==', cod_catalogo)
                          .where('linea', '==', linea)
                          .where('tipo', '==', tipo)
                          .where('version','==', this._parEmpreProv.usuario.Version)
                          .where('sub_tipo', '==', sub_tipo))
                          .valueChanges()
                          .subscribe((data_producto) => 
                            {
                              //console.log("DATA CATEGORIA FIREBASE", data)
                              this.producto=data_producto;
                              console.log("Linea-color en Firebase:",this.producto);
                            },
                    
                            (err)=>{ console.log("Error en el data de Fb", err) }
                            );

    }
    else{  //PEDIR PRODUCTOS EN NETSOLIN JM 11/10/2018
       console.log ("ESTA EN NETSOLIN")
        NetsolinApp.objenvrest.filtro = cod_catalogo;
        // console.log(" NetsolinApp.objenvrest.filtro");
        // console.log(subcategoria);
        this.cargo_productos = false;
        let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=JAVARPRODSUB&TIPO="
        //console.log('Entro a pedir subcategoria');
        this.http.post( url, NetsolinApp.objenvrest )
              .map (resp=> resp.json())
              .subscribe(data=>
                {             
                //   console.log('Datos traer productos por subcategoria');
                // console.log(data);
                this.producto=data.tien_product;
                // console.log(this.subcategoria);
                
                if (data.error){
                //  console.log('data.error');
                //  console.log(data.error);
                }else{
                  this.cargo_productos = true;
                }
        })
        
  }
  }

  //Trae catalogos de tabla en NEtsolin y los pasa a firebase
  subir_catalogosafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETCATALOGS"
    console.log('Entro a subir_catalogosafb url:',this._parEmpreProv.URL_SERVICIOS,url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_catalogosafb data:', data);
      if (data.error){
        console.log('data.error', data.error);
      }else{
        //reccorrer y grabar en fb
        data.catalogos.forEach((itemcat) => {
          let larchivo = '/img_catalogos/' + itemcat.ima_boton.trim();
          const ref = this.afStorage.ref(larchivo);
          console.log('subir_catalogos: ', itemcat.cod_catalogo);
          ref.getDownloadURL().subscribe((url: any) =>  {
            itemcat.link_img = url;
            this.fbDb.collection('catalogos').doc(itemcat.cod_catalogo).set(itemcat);                
          },
          err => {
            this.fbDb.collection('catalogos').doc(itemcat.cod_catalogo).set(itemcat);                
          });
        });
  
      }
    });    
  }
  //Trae catalogos de tabla en NEtsolin y los pasa a firebase
  subir_subtiposafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETSUBTIPO"
    console.log('Entro a subir_subtiposafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_subtiposafb data:', data);
      if (data.error){
        console.log('data.error', data.error);
      }else{
        //reccorrer y grabar en fb
        data.catalogos.forEach((itemcat) => {
          let larchivo = '/img_subtipos/' + itemcat.ima_boton.trim();
          const ref = this.afStorage.ref(larchivo);
          console.log('subir_subtiposafb: itemcat;',itemcat, itemcat.cod_catalogo);
          ref.getDownloadURL().subscribe((url: any) =>  {
            itemcat.link_img = url;
            this.fbDb.collection('subtipos').doc(itemcat.cod_catalogo+itemcat.cod_subtipo).set(itemcat);                
          },
          err => {
            this.fbDb.collection('subtipos').doc(itemcat.cod_catalogo+itemcat.cod_subtipo).set(itemcat);                
          });
        });
  
      }
    });    
  }

  subir_lineasafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETARMACATL"
    console.log('Entro a subir_lineasafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_lineasafb data:', data);
      if (data.error){
        console.log('data.error lineas', data.error);
      }else{
        //reccorrer y grabar en fb
        data.datos.forEach(itemcat => {
          let larchivo = '/img_lineas/'+ itemcat.linea.trim() +'/' + itemcat.linea.trim()+'.jpg';
          const ref = this.afStorage.ref(larchivo);
          console.log('subir_linea: ', itemcat.linea);
          ref.getDownloadURL().subscribe((url: any) =>  {
            itemcat.link_img = url;
            this.fbDb.collection('armacatl').doc(itemcat.linea).set(itemcat);                
            },
            err =>{
              this.fbDb.collection('armacatl').doc(itemcat.linea).set(itemcat);                
            });
        });
  
      }
    });    
  }

  actualizar_linkimagenfb_lineas(){       
          this.fbDb.collection('armacatl').valueChanges()
            .subscribe((data) => 
            {             
              console.log("DATA lineas a recoorer para act link imagen", data);
            //reccorrer y grabar en fb
            data.forEach((itemcat: any) => {
              //solo las que no tienen imagen por velocidad
              if (itemcat.link_img ===''){
              let larchivo = '/img_lineas/' + itemcat.linea.trim() +'/' + itemcat.linea.trim() + '.jpg';
              const ref = this.afStorage.ref(larchivo);
              ref.getDownloadURL().subscribe((url: any) =>  {
                itemcat.link_img = url;
                console.log('Se actualiza imagen para linea: ' + itemcat.linea, itemcat.link_img);
                this.fbDb.collection('armacatl').doc(itemcat.linea).set(itemcat);                
                },
                err =>{
                  console.log('No hay imagen para linea: ' + itemcat.linea);
                  // this.fbDb.collection('armacatl').doc(itemcat.linea).set(itemcat);                
                });
            }});  
            },   
            (err)=>{ console.log("Error en el data de Fb", err) }          
            );        
  }
  actualizar_linkimagenfb_unalinea(pcod_catalogo,plinea,pversion){
    let larchivo = '/img_lineas/' + plinea.trim() +'/' + plinea.trim() + '.jpg';
    const ref = this.afStorage.ref(larchivo);
    ref.getDownloadURL().subscribe((url: any) =>  {
      const datoact = {link_img : url};
      console.log('Se actualiza imagen para linea: ' + pcod_catalogo.trim()+plinea.trim()+pversion.trim(), url);
      this.fbDb.collection('armacatl').doc(pcod_catalogo.trim()+plinea.trim()+pversion.trim()).update(datoact);                
      },
      err =>{
        console.log('No hay imagen para linea: ' + plinea);
      });

  }
  actualizar_linkimagenfb_lineacolor(){       
    this.fbDb.collection('armacatlcol').valueChanges()
      .subscribe((data) => 
      {             
        console.log("DATA linea color a recoorer para act link imagen", data);
      //reccorrer y grabar en fb
      data.forEach((itemcat: any) => {
        let larchivo =  '/img_lineas/'+ itemcat.linea.trim() +'/'  + itemcat.linea.trim()+' '+itemcat.color.trim() + '.jpg';
        const ref = this.afStorage.ref(larchivo);
        ref.getDownloadURL().subscribe((url: any) =>  {
          itemcat.link_img = url;
          console.log('Se actualiza imagen para color: ' + itemcat.color, itemcat.link_img);
          this.fbDb.collection('armacatlcol').doc(itemcat.color).set(itemcat);                
          },
          err =>{
            console.log('No hay imagen para color: ' + itemcat.color);
            // this.fbDb.collection('armacatl').doc(itemcat.linea).set(itemcat);                
          });
      });  
      },   
      (err)=>{ console.log("Error en el data de Fb", err) }          
      );        
}

  subir_coloresafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETARMACATLC"
    console.log('Entro a subir_coloresafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_coloresafb data:', data);
      if (data.error){
        console.log('data.error colores', data.error);
      }else{
        //reccorrer y grabar en fb
        data.datos.forEach(itemcat => {
          let larchivo = '/img_lineas/'  + itemcat.linea.trim()+ '/'+ itemcat.linea.trim()+' '+itemcat.color.trim()+'.jpg';
          const ref = this.afStorage.ref(larchivo);
          console.log('subir_colores: ', itemcat.color);
          ref.getDownloadURL().subscribe((url: any) =>  {
            itemcat.link_img = url;
            this.fbDb.collection('armacatlcol').doc(itemcat.color).set(itemcat);                
            },
            err =>{
              this.fbDb.collection('armacatlcol').doc(itemcat.color).set(itemcat);                
            });
        });  
      }
    });    
  }

  subir_curvasLineaafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETCURVAS"
    console.log('Entro a subir_curvasLineaafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_curvasLineaafb data:', data);
      if (data.error){
        console.log('data.error curvasLinea', data.error);
      }else{
        //reccorrer y grabar en fb
        data.datos.forEach(itemcat => {         
          this.fbDb.collection('armacatlcur').doc(itemcat.linea+'-'+itemcat.curva).set(itemcat);                
        });
  
      }
    });    
  }

  subir_curvasafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETARCATLCUR"
    console.log('Entro a subir_curvasafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_curvasafb data:', data);
      if (data.error || data.isCallbackError){
        console.log('data.error curvas', data);
      }else{
        //reccorrer y grabar en fb
        data.datos.forEach((itemcat,i) => {
          console.log(i,'  subir_curvas: ', itemcat);
          if(itemcat.cod_curva.indexOf("/")==-1)
            this.fbDb.collection('curvas').doc(itemcat.cod_curva).set(itemcat);                
        });
  
      }
    });    
  }

  subir_referenciasafb(){
    let url= this._parEmpreProv.URL_SERVICIOS + "netsolin_servirestgo.csvc?VRCod_obj=INVASCATRETREFXLINCO"
    console.log('Entro a subir_referenciasafb url:', url);
    this.http.post( url, NetsolinApp.objenvrest )
    .map (resp=> resp.json())
    .subscribe(data=>
    {             
      console.log('Datos traer subir_referenciasafb data:', data);
      if (data.error){
        console.log('data.error referencia', data.error);
      }else{
        //reccorrer y grabar en fb
        let num = 0;
        data.datos.forEach((itemcat,i) => {    
          if ( itemcat.cod_refinv=="") {
            itemcat.cod_refinv = itemcat.codlincolo+""+itemcat.talla;
          }
          itemcat.cod_refinv = itemcat.cod_refinv.replace("/","_");
          console.log(i, "   ", itemcat.cod_refinv)     
          this.fbDb.collection('refxlincol').doc(itemcat.cod_refinv).set(itemcat).then(() =>{
            num++;
            console.log("ha subido ",num);
          });                
        });  
      }
    });    
  }
  
  traerlinkimgagenfb(codigo) {
    const ref = this.afStorage.ref(`/imagenes/`+ codigo.trim());
    console.log('traerlinkimgagenfb ref a traer: ', 'imagenes/' + codigo.trim());
    ref.getDownloadURL().subscribe((url: any) =>  {
      console.log('traerlinkimgagenfb suscribe de ref a traer: ', 'imagenes/' + codigo.trim(), url);
      console.log('traerlinkimgagenfb urlretorna: ', url);
      return url;
    });
  }

  //Cargar Curva según linea de Viatropical
  pedir_curva(cod_catalogo:string, linea:string,tipo:string,sub_tipo:string){

    if (this.seleccion_fb===true){ //PEDIR CURVAS EN FIREBASE JM 17/10/2018
      console.log ("ESTA EN FIREBASE: Pedir_Curva ()")
      console.log ("Parametros recibidos",cod_catalogo,linea,tipo,sub_tipo)
      this.fbDb.collection(
        'armacatlcur', cod => 
                       cod.where('cod_catalogo', '==', cod_catalogo)
                          .where('linea', '==', linea)
                          .where('tipo', '==', tipo)
                          .where('version','==', this._parEmpreProv.usuario.Version)
                          .where('sub_tipo', '==', sub_tipo))
                          .valueChanges()
                          .subscribe((data_curva) => 
                            {
                              //console.log("DATA CATEGORIA FIREBASE", data)
                              this.curva=data_curva;
                              console.log("Curvas en Firebase:",this.curva);
                            },
                    
                            (err)=>{ console.log("Error en el data de Fb", err) }
                            );
    

    }
    else{  //PEDIR PRODUCTOS EN NETSOLIN JM 11/10/2018
        
  }

  }

  //Cargar Talla según linea de Viatropical
  pedir_talla(linea:string,color:string){

    if (this.seleccion_fb===true){ //PEDIR TALLAS EN FIREBASE JM 17/10/2018
      console.log ("ESTA EN FIREBASE: Pedir_talla ()")
      console.log ("Parametros recibidos",linea+color)
      this.fbDb.collection(
        'refxlincol', cod => 
                       cod.where('codlincolo', '==', linea+color))
                          .valueChanges()
                          .subscribe((data_talla) => 
                            {
                              //console.log("DATA CATEGORIA FIREBASE", data)
                              this.talla=data_talla;
                              console.log("talla en Firebase:",this.talla);
                            },
                    
                            (err)=>{ console.log("Error en el data de Fb", err) }
                            );
    

    }
    else{  //PEDIR PRODUCTOS EN NETSOLIN JM 11/10/2018
        
  }

  }

  pedir_imagen(color:string){

    if (this.seleccion_fb===true){ //PEDIR TALLAS EN FIREBASE JM 17/10/2018
      console.log ("ESTA EN FIREBASE: Pedir_imagen ()")
      console.log ("Parametros recibidos",color)
      this.fbDb.collection(
        'armacatlcol', cod => 
                       cod.where('color', '==', color).where('version','==', this._parEmpreProv.usuario.Version))
                          .valueChanges()
                          .subscribe((data_imagen) => 
                            {
                              //console.log("DATA CATEGORIA FIREBASE", data)
                              this.imagen=data_imagen;
                              console.log("Imagen en Firebase:",this.imagen);
                            },
                            (err)=>{ console.log("Error en el data de Fb", err) }
                            );
    

    }
    else{  //PEDIR PRODUCTOS EN NETSOLIN JM 11/10/2018
        
  }

  }

  //Traer Tabla segun Curva
  ver_tabla_curva(){
    this.curva.forEach(curva => {
      if (this.seleccion_fb===true){ //PEDIR TABLA CURVAS EN FIREBASE JM 17/10/2018
        console.log ("ESTA EN FIREBASE: ver_tabla_curva ()")
        console.log ("Parametros recibidos",curva)
        this.fbDb.collection(
          'curvas', cod => 
                          cod.where('cod_curva', '==', curva.curva))
                            .valueChanges()
                            .subscribe((data_tbcurva) => 
                              {
                                //console.log("DATA CATEGORIA FIREBASE", data)
                                this.tabla_curva=this.tabla_curva.concat(data_tbcurva);
                                console.log("Tabla de curvas en Firebase:",data_tbcurva,this.tabla_curva);
                              },                    
                              (err)=>{ console.log("Error en el data de Fb", err) }
                              );
      }
      else{  //PEDIR PRODUCTOS EN NETSOLIN JM 11/10/2018
          
      }
    });
  }

  //Agrupar en vectores de 2 [],[]
 private agrupar(arr:any , tamano:number)
  {
    let nuevoArreglo=[];
    for (let i=0; i<arr.length; i+=tamano)
    {
      nuevoArreglo.push(arr.slice(i,i+tamano));
    }
    //  console.log(nuevoArreglo);
     return nuevoArreglo;
     
  }

  // Mostrar Menu globalmente JM 13/11/2018
  mostrarMenu()
  {
    console.log("Entro en mostrar Menu")
    this.menuCtrl.toggle();
  }  

  obtenerImagenFB()
  {
    console.log("ESTA EN FB obtenerImagenFB()");

    firebase.storage().ref().child('imagenes/10594 21278.jpg').getDownloadURL()
    .then((url)=>{
      
      let image_prueba=url;
      console.log ("image_prueba",image_prueba);

    });
  }

//*********************************************************//
//****** Banner******//
//*********************************************************//

getBannernivel1(){
  const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'+this._parEmpreProv.idcatalogo+'/banner1';
  console.log(idcollection);
  return this.fbDb.collection<any>(idcollection).snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        // get id from firebase metadata 
        const id = a.payload.doc.id; 
        console.log("####categories data="+data);
        console.log("####categories Id ="+id);
        return { id, ...data };
      });
    })
  );

}  





getCategories(){
  console.log("start getCategory");
  const idcollection = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'+this._parEmpreProv.idcatalogo+'/nivel1/';
  console.log(idcollection);
  return this.fbDb.collection<any>(idcollection).snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        // get id from firebase metadata 
        const id = a.payload.doc.id; 
        console.log("####categories data="+data);
        console.log("####categories Id ="+id);
        return { id, ...data };
      });
    })
  );

}
}



