import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { CarritoService } from '../../providers/carrito.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ParEmpreService } from "../../providers/par-empre.service";
import { ImagePage } from '../image/image.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto:any;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };
 
  constructor( public _ps: ProductosService,
                private modalController: ModalController,
               public _cs: CarritoService,    
               private activatedRoute: ActivatedRoute,
               public _DomSanitizer: DomSanitizer,
               public _parEmpreProv: ParEmpreService,
               private router: Router
                         ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.producto = data;
      console.log("Parametros que vienen de por-subcategoria",data);
      this._ps.pedir_talla(this.producto.linea,this.producto.color);
    })
  }
  openPreview(image) {
    this.modalController.create({
      component: ImagePage,
      componentProps: {value: image, idimg: '', rutafbi: '' 
      }
    }).then(modal => {
      modal.present();
    });
  }
  
}
