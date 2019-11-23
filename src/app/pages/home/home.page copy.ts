import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  MenuController,
  LoadingController,
  Platform,
  ModalController,
  ActionSheetController,
  IonInfiniteScroll,
  AlertController
} from "@ionic/angular";
import { TranslateProvider } from "../../providers";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ParEmpreService } from "../../providers/par-empre.service";
import { ProductosService } from "../../providers/productos.service";
import { CarritoService } from "../../providers/carrito.service";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  openMenu: Boolean = false;
  items: string[];
  user: any = {};
  cargo_nivel1: boolean;
  nivel1: any[]=[];
  pagina = 0;
  linknivel=''

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    public _parEmpreProv: ParEmpreService,
    public platform: Platform,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    public _ps: ProductosService,
    public _DomSanitizer: DomSanitizer,
    public _cs: CarritoService,
    public alertController: AlertController
  ) {
    platform.ready().then(() => {
      console.log("En constructor home usuario: ");
      // this._ps.cargar_todos(); //Caragar todos los productos
      // this._ps.cargar_lineas();//Cargar las categorias
      // this._ps.obtenerImagenFB();  
      this._ps.get_nivel1()
        .subscribe((data_nivel1) => 
      {        
        console.log("DATA nivel 1 FIREBASE", data_nivel1)
        this.nivel1=data_nivel1;
        this.linknivel = 'clientes/'+this._parEmpreProv.datosEmpre.nit+'/catalogo/'+this._parEmpreProv.idcatalogo+'/nivel1/';
        console.log('this.linknivel',this.linknivel);
        console.log("Nivel 1 en Fb",this.nivel1)
        this.cargo_nivel1 = true;
      },
      (err)=>{ console.error("Error en el data de Fb", err) 
      this.cargo_nivel1 = false;
      });
    });
  }

  ngOnInit() {
    this.pagina = 1;
    // console.log("ngOnInit home");
  
    // this._ps.cargar_lineas().then( cargo => {
    //   console.log('Cargo Lineas');
    //   console.log('Categoria en appComponent');
    //   console.log(this._ps.categoria);
      
    //   this.categoria=this._ps.categoria; 
  
    //   if(cargo) {
    //     this.cargo_lineas = true;
    //     console.log("Cargo Lineas",this.cargo_lineas)
    //   } else {
    //     this.cargo_lineas = false;
    //     console.log("No Cargo Lineas",this.cargo_lineas)
    //   }
    //   });    
  }
  loadData(event)
  {
      this.pagina += 1;
      console.log('crecioPagina');
      event.target.complete();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  editprofile() {
    this.navCtrl.navigateForward("edit-profile");
  }

  settings() {
    this.navCtrl.navigateForward("settings");
  }

  goToWalk() {
    this.navCtrl.navigateRoot("walkthrough");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  register() {
    this.navCtrl.navigateForward("register");
  }

  async messages() {
    const alert = await this.alertController.create({
      header: 'Mensajes',
      message: 'No tiene mensajes.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //convertir cadena "20181020" a una fecha
  convCadenaFecha(cadena) {
    let ano = cadena.substr(0, 4);
    let mes = cadena.substr(4, 2);
    let dia = cadena.substr(6, 2);
    let fecha = new Date(ano, mes, dia, 0, 0, 0, 0);
    return fecha;
  }

}
