import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IonInfiniteScroll } from "@ionic/angular";

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-por-subtipo',
  templateUrl: './por-subtipo.page.html',
  styleUrls: ['./por-subtipo.page.scss'],
})
export class PorSubtipoPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  public items: Observable<any[]>;

  subtipo = null;
  param_subcat: any;
  subsubtipo: any;
  idbase:any;
  nivel: number = 2;
  pagina = 0;
  cargo_nivel: boolean;
  datosnivel: any[]=[];
  linknivant="";
  linknivel=""

  constructor( public _ps: ProductosService,
               public router: Router,
               public _DomSanitizer: DomSanitizer,
               public activatedRoute: ActivatedRoute,) {
                 this.cargo_nivel = false;
                }

  ngOnInit() {
    this.pagina=1;    
    this.subtipo=this.activatedRoute.snapshot.paramMap.get('id');
    this.idbase=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ngOnInit this.subtipo: ',this.subtipo);
    const pnivel=this.activatedRoute.snapshot.paramMap.get('nivel');
    this.nivel= Number(pnivel);
    // if (this.nivel > 1){
    this.linknivant=this.activatedRoute.snapshot.paramMap.get('linknivant');
    this.linknivel =  this.linknivant + '/nivel'+pnivel.toString()+'/';
    console.log('ngOnInit this.linknivant: ',this.linknivant);
    // }
    console.log('ngOnInit this.nivel: ',this.nivel);
    this._ps.get_xnivel(this.nivel,this.idbase,this.linknivant).subscribe((datos: any) => {
        console.log('get_xnivel  datos:',this.nivel,this.idbase,datos);
        this.datosnivel = datos;
        console.log("Datos Nivel en Fb",this.nivel,this.datosnivel)
        this.cargo_nivel = true;

        // this._ps.catalogo_act = datos.nombre;
        // console.log("Parametros que vienen de subtipo");
        // console.log("cod_catalogo:",this.subtipo,datos.cod_catalogo)
        // this.param_subcat=this._ps.cargar_subtipos(datos.cod_catalogo);
        });
      this.items = this._ps.get_xnivel(this.nivel,this.idbase,this.linknivant);

  }

  loadData(event)
  {
      this.pagina += 1;
      console.log('crecioPagina');
      event.target.complete();
  }

  openDetail(url,itemId){
    console.log('a opendetail',url,itemId);
    this.router.navigateByUrl('/'+url+'/'+itemId);
    // this.router.navigateByUrl(url+'/'+itemId);
  }

}
