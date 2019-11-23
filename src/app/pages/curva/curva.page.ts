import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { CarritoService } from '../../providers/carrito.service';
import { _ParseAST } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { ParEmpreService } from "../../providers/par-empre.service";

@Component({
  selector: 'app-curva',
  templateUrl: './curva.page.html',
  styleUrls: ['./curva.page.scss'],
})
export class CurvaPage implements OnInit {
  mostrar_tabla: boolean;
  tabla:number;
  producto: any;
  total_c: number;
  total_p: number;


  constructor( public _ps: ProductosService,
               public _cs: CarritoService,
               public _DomSanitizer: DomSanitizer,
               public _parEmpreProv: ParEmpreService,
               public activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(data => {
      this.producto = Object.assign({t_curvas: 0, t_tallas: 0, t_pares: 0, curvas: [], tallas: []},data);
      this.producto.t_curvas = 0;
      this.producto.t_tallas = 0;
      this.producto.t_pares = 0;
      this.producto.curvas = [];
      this.producto.tallas = [];
      console.log("curva ",this.producto,this._parEmpreProv);
      this._ps.ver_tabla_curva();
    })
  }
  
  ver_curva(i:number){
    this.mostrar_tabla=!this.mostrar_tabla;
    this.tabla = this._ps.tabla_curva[i];
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

  total_curvas(){
    this.total_c = 0;
    this.total_p = 0;
    console.log(this._ps.tabla_curva);
    this._ps.curva.forEach((c,i) => {
      console.log(i);
      let enc = false;
      let pares:number;
      if (c.cantidad===NaN  || c.cantidad===undefined || c.cantidad==='' )
      {
          c.cantidad=0;
      }
      this.producto.curvas.forEach(element => {
        if(element.curva == c.curva){
          element.cantidad = c.cantidad;
          enc = true;
          pares = element.pares; 
        }
      });
      if(!enc){          
        pares = this._ps.tabla_curva[i].tot_pares;
        let obj = {curva: c.curva, cantidad: c.cantidad, pares: pares};
        this.producto.curvas.push(obj);
      }
      this.total_c += Number(parseInt(c.cantidad, 10));
      this.total_p += Number(parseInt(c.cantidad, 10))*pares;
      console.log("codigo curva:");
      console.log(this.total_c);
    });
    this.producto.t_pares=this.total_p;
    this.producto.t_curvas=this.total_c;
    console.log ("Objeto producto");
    console.log (this.producto);
  }
}
