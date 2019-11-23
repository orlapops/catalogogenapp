import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { ParEmpreService } from '../../providers/par-empre.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.page.html',
  styleUrls: ['./wait.page.scss'],
})
export class WaitPage implements OnInit {

  constructor(
    public _parEmpreProv: ParEmpreService,
    public auth : AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
  ) { }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  //analizado
  ngOnInit() {
    if(this._parEmpreProv.usuario.Vista){
      this.goToHome();
    }
    
  }
  
  // analizado
  goToHome() {
    console.log('pasando a home');
    this.navCtrl.navigateRoot('/home');
  }
   // analizado
   goToLogin() {
    console.log('pasando a login');
    this._parEmpreProv.borrarUsuarioStorage();
    this.navCtrl.navigateRoot('/login');
  }
  
  async presentLoading(pmensaje) {
    const loading = await this.loadingCtrl.create({
      message: pmensaje,
      spinner: 'dots',
      duration: 1000
    });
    return await loading.present();
  }

}
