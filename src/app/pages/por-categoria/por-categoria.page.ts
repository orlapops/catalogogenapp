import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IonInfiniteScroll } from "@ionic/angular";
import { ParEmpreService } from '../../providers/par-empre.service';


@Component({
  selector: 'app-por-categoria',
  templateUrl: './por-categoria.page.html',
  styleUrls: ['./por-categoria.page.scss'],
})
export class PorCategoriaPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  categoria = null;
  subtipo = null;
  param_subcat: any;
  subcategoria: any;
  pagina = 0;
  constructor( public _ps: ProductosService,
               public router: Router,
               public _parEmpreProv: ParEmpreService,
               public _DomSanitizer: DomSanitizer,
               public activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.pagina=1;
    // this.categoria=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('llega this.categoria',this.categoria);
    this.activatedRoute.params.subscribe(data => {
        console.log("Parametros que vienen de por-categoria data: ",data);
        this.categoria = data.cod_catalogo;
        this.subtipo = data.sub_tipo;

    })
    this._ps.get_catalogo(this.categoria.trim()+this._parEmpreProv.usuario.Version.trim()).subscribe((datos: any) => {
      console.log('datos cget_catalogo datos,this.categoria,this.subtipo',datos,this.categoria,this.subtipo);
      this._ps.catalogo_act = datos.nombre;
      this._ps.get_subtipo(this.categoria+this.subtipo).subscribe((datossub: any) => {
        // console.log('datos cget_catalogo',datossub);
          this._ps.catalogo_act += ' - '+ datossub.nombre;
      });
    });
    console.log("Parametros que vienen de categoria");
    console.log("cod_catalogo:",this.categoria)
    this.param_subcat=this._ps.pedir_subcategoria(this.categoria,this.subtipo);
  }

  loadData(event)
  {
      this.pagina += 1;
      console.log('crecioPagina');
      event.target.complete();
  }
  Actlinkimagen(pcod_catalogo,plinea,pversion)
  {
    this._ps.actualizar_linkimagenfb_unalinea(pcod_catalogo,plinea,pversion);
    console.log('Actualizar link imagenpcod_catalogo,plinea,ptipo,psub_tipo: ',pcod_catalogo,plinea,pversion)
  }
}
