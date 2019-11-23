import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductosService } from '../../providers/productos.service';
import { CarritoService } from '../../providers/carrito.service';
import { ParEmpreService } from "../../providers/par-empre.service";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  item_imagen: any; //Obtener la Imagen segun el Item
  color: any;
  imagen: any;

  constructor(public _ps: ProductosService,
    public _cs: CarritoService,
    public router: Router,
    public toastCtrl: ToastController,
    public _parEmpreProv: ParEmpreService,
    public _DomSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("this.items en Historial pedidos Page:", this._cs, this._cs.items);
    console.log(this._cs.items.length);
  }
  async hacerPedido() {
    const now = new Date();
    const hora = now.getHours();
    const minutos = now.getMinutes();
    const horaped = hora.toString() + minutos.toString()
    const idpedido = 90000000000 + now.getTime();
    const objpedidogfb = {
      id_pedido: idpedido,
      cod_dpedid: '',
      num_dpedid: '',
      creado_netsolin: false,
      verificado: false,
      usuar_verifica: '',
      fecha: Date(),
      hora_ped: parseInt(horaped),
      items: this._cs.items,
      nomusuar_crea: this._parEmpreProv.usuario.Nombre,
      email: this._parEmpreProv.usuario.Email,
      id_empresa: this._parEmpreProv.usuario.id_empresa
    };
    console.log('a guardar fb ',this._parEmpreProv.usuario.id_empresa, idpedido.toString(), objpedidogfb);
    this._ps.guardarpedidoFb(this._parEmpreProv.usuario.id_empresa, idpedido.toString(), objpedidogfb)
      .then(async res => {
        console.log('respuesta grabar ped fb',res);
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'Pedido registrado',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this._cs.borrar_storage();
      })
      .catch(async (err) => {
        console.log('Error guardando pedido en Fb', err);
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'Error no se pudo guardar pedido',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });

  }

}
