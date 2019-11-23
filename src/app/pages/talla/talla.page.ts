import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { CarritoService } from '../../providers/carrito.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ParEmpreService } from "../../providers/par-empre.service";

@Component({
  selector: 'app-talla',
  templateUrl: './talla.page.html',
  styleUrls: ['./talla.page.scss'],
})
export class TallaPage implements OnInit {
  producto: any;
  total_t: number;


  constructor( public _ps: ProductosService, 
               public _cs: CarritoService,
               public _DomSanitizer: DomSanitizer,
               public _parEmpreProv: ParEmpreService,
               private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(){  
    this.activatedRoute.params.subscribe(data => {
      this.producto = Object.assign({t_curvas: 0, t_tallas: 0, t_pares: 0, curvas: [], tallas: []},data);
      this.producto.t_curvas = 0;
      this.producto.t_tallas = 0;
      this.producto.t_pares = 0;
      this.producto.curvas = [];
      this.producto.tallas = [];
      console.log("Parametros que vienen de Producto");
      console.log(this.producto);
      console.log (this._ps.talla)
    })
  }

  incrementarcantidad(item){
    if (item.cantidad===NaN  || item.cantidad===undefined || item.cantidad==='' || item.cantidad === 0 )
    {
       //  console.log("item.cantidad es indefinido")
        item.cantidad = 1;
    } else 
    {
     item.cantidad += 1;
    }
  }

  decrementarcantidad(item){
    if (item.cantidad===NaN  || item.cantidad===undefined || item.cantidad==='' || item.cantidad === 0)
    {
       //  console.log("item.cantidad es indefinido")
        item.cantidad = 0;
    } else 
    {  
     item.cantidad -= 1;
    }
  }

  //CALCULAR TOTAL DE TALLAS JM24102018
  total_tallas(){
    this.total_t = 0;
    this._ps.talla.forEach((t) => {
      let enc = false;
      if (t.cantidad===NaN  || t.cantidad===undefined || t.cantidad==='' )
      {
          console.log("t.cantidad es indefinido")
          t.cantidad=0;
      }
      this.producto.tallas.forEach(element => {
        if(element.talla == t.talla){
          element.cantidad = t.cantidad;
          enc = true;
        }
      });
      if(!enc){          
        let obj = {talla: t.talla, cantidad: t.cantidad};
        this.producto.tallas.push(obj);
      }
      this.total_t += Number(parseInt(t.cantidad, 10));
      // console.log("Total tallas:");
      // console.log(this.total_t);
    });
    this.producto.t_tallas=this.total_t;
    this.producto.t_pares=this.total_t;
  }
}
