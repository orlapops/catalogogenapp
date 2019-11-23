import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-por-subcategoria',
  templateUrl: './por-subcategoria.page.html',
  styleUrls: ['./por-subcategoria.page.scss'],
})
export class PorSubcategoriaPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  // subcategoria=null;
  subcategoria:any;
  cargo_lineas: boolean;
  pagina =0;
  constructor( public _ps: ProductosService,
               public activatedRoute: ActivatedRoute,
               public _DomSanitizer: DomSanitizer,
               public router: Router
               ) { }

  // ngOnInit() {
   
  //   this.subcategoria=this.activatedRoute.snapshot.paramMap.get('id');
  //   console.log("Parametros que vienen de por-categoria");
  //   console.log(this.subcategoria)
  //   // this._ps.pedir_producto(this.subcategoria);
  // }

  ngOnInit() {
    this.pagina = 1;
    this.activatedRoute.params.subscribe(data => {
      this.subcategoria = data;
        console.log("Parametros que vienen de por-categoria");
        console.log(this.subcategoria)

        //ENVIAR PARAMETROS PARA OBTENER LINEA-COLOR JM 06/11/2018
        this._ps.pedir_producto(this.subcategoria.cod_catalogo,
          this.subcategoria.linea,
          this.subcategoria.tipo,
          this.subcategoria.sub_tipo);

        //ENVIAR PARAMETROS PARA OBTENER CURVA JM 06/11/2018
        this._ps.pedir_curva(this.subcategoria.cod_catalogo,
              this.subcategoria.linea,
              this.subcategoria.tipo,
              this.subcategoria.sub_tipo);

        console.log("PARAMETROS ENVIADOS:")                     
        console.log("Cod_Catalogo:",this.subcategoria.cod_catalogo)
        console.log("Linea:",this.subcategoria.linea)
        console.log("Tipo:",this.subcategoria.tipo)
        console.log("Sub_Tipo:",this.subcategoria.sub_tipo)

    })


  }

  loadData(event)
  {
      this.pagina += 1;
      console.log('crecioPagina');
      event.target.complete();
  }

}
