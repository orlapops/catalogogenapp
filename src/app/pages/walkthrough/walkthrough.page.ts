import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonSlides, MenuController } from '@ionic/angular';
import { ParEmpreService } from '../../providers/par-empre.service';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

  showSkip = true;
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: string = 'ltr';

  slideList: Array<any> = [
    {
      title: 'Catálogo Vía Tropical',
      description: 'Acceda a la última colección de sus marcas favoritas.',
      image: 'assets/img/walltrhougth1.png',
    },
    {
      title: 'Pedidos.',
      description: 'Clientes autorizados podran realizar sus pedidos en línea.',
      image: 'assets/img/walltrhougth3.png',
    },
    // {
    //   title: 'Consultas directas!',
    //   description: 'Inventario actualizado, cartera de clientes visitasdos, seguimientos.',
    //   image: 'assets/img/hotel-sp03.png',
    // },
    // {
    //   title: 'Genere operaciones!',
    //   description: 'Realize pedidos, facturas, recibos de caja, registre cambios y devoluciones.',
    //   image: 'assets/img/hotel-sp03.png',
    // },
    // {
    //   title: 'Sincronice con Netsolin Erp!',
    //   description: 'Las operaciones registradas seran registradas directamente en el Erp de forma que se ahorre tiempos y errores.',
    //   image: 'assets/img/hotel-sp03.png',
    // }
  ];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public _parEmpreProv: ParEmpreService,
    public router: Router
  ) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onSlideNext() {
    this.slides.slideNext(1000, false);
  }

	onSlidePrev() {
    this.slides.slidePrev(300);
  }


  openLoginPage() {
    const datosdelicencia = {
      aplicaciones: '(0)(1)',
      apps: true,
      error: false,
      key_firebase: '',
      key_maps: null,
      licencia: 'NSOLSQLIVT13020901',
      logeo_firebase: true,
      nit_empresa: '900262186',
      nom_empresa: 'INVERSIONES VIA TROPICAL',
      // url_publica: 'http://190.165.176.69/VIATROPICAL/',
      
      url_publica: 'http://190.85.93.218/VIATROPICAL/',
      util_firebase: true,
      util_logeo: true
    };
    setTimeout(() => 
    {
      this.navCtrl.navigateForward('/login');
    },
    500);
  }

}
