export const environment = {
  production: true, // set TRUE before you build and release a prod version.
  // Set your app configurations here.
  // For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
  config: {
    // iconMode: 'md',
    // mode: 'md'
    // iconMode: 'ios',
    // mode: 'ios'
    // preloadModules: true,
    // scrollPadding: false,
    // scrollAssist: true,
    autoFocusAssist: false,
    menuType: 'overlay'
  },
  firebase: {
    //Via tropical con proyecto catalogo
    // apiKey: "AIzaSyCFv63sqOWZKp3CJvFOeq8WDIHJwR26XpE",
    // authDomain: "viatropicalfb.firebaseapp.com",
    // databaseURL: "https://viatropicalfb.firebaseio.com",
    // projectId: "viatropicalfb",
    // storageBucket: "viatropicalfb.appspot.com",
    // messagingSenderId: "474270541113"

    apiKey: "AIzaSyCiD_eKkGXT2-XwCgBK85LHE9HiWPpeuW8",
    authDomain: "netsolincatrut.firebaseapp.com",
    databaseURL: "https://netsolincatrut.firebaseio.com",
    projectId: "netsolincatrut",
    storageBucket: "netsolincatrut.appspot.com",
    messagingSenderId: "549314286487",
    appId: "1:549314286487:web:14d7d8067c4c16e5df2ad2",
    measurementId: "G-Y0RJ86CQXE"

    
        },
  // Set language to use.
  language: 'en',
  // Loading Configuration.
  // Please refer to the official Loading documentation here: https://ionicframework.com/docs/api/components/loading/LoadingController/
  loading: {
    spinner: 'circles'
  },
  // Toast Configuration.
  // Please refer to the official Toast documentation here: https://ionicframework.com/docs/api/components/toast/ToastController/
  toast: {
    position: 'bottom' // Position of Toast, top, middle, or bottom.
  },
  toastDuration: 3000, // Duration (in milliseconds) of how long toast messages should show before they are hidden.
  // Angular Google Maps Styles Config
  // //
}
