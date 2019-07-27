import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// import { FingerPrintAuth } from 'capacitor-fingerprint-auth';
// const { SplashScreen, Device } = Plugins;
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

import { CardsService } from './cards.service';
import { Card } from './card.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit, OnDestroy {
  savedCards: Card[];
  cardsUpdated: Subscription;
  // auth: FingerPrintAuth;
  authErr = '';
  constructor(private cardService: CardsService, private device: Device, private splashScreen: SplashScreen, public plt: Platform) {
    // this.auth = new FingerPrintAuth();
   }

  /* async isAvailable() {
    await this.auth.available();
  }

  async verify() {
    try {
      await this.auth.verify();
    } catch (e) {
      console.log(e);
    }
  }
  async verifyWithFallback() {
    try {
      this.auth.verifyWithFallback();
    } catch (error) {
      console.log(error);
    }
  } */

  ngOnInit() {
    this.plt.ready().then(() => {
      this.cardService.getFromStorage('cards', true).then(val => {
        let desk = this.plt.is('desktop');
        console.log(desk);
        this.savedCards = val;
        console.log(this.savedCards);
        this.cardsUpdated = this.cardService.getSubject().subscribe(cards => this.savedCards = cards);
        // Hide the splash (you should do this on app launch)
        this.splashScreen.hide();
      });
    });
    /* Device.getInfo().then(async info => {
      if (info.platform === 'ios' || info.platform === 'android') {
        const authAvail = await this.auth.available();
        let isVerified;
        if (authAvail) {
          try {
            isVerified = await this.auth.verify();
            if (isVerified) {
              this.authErr = 'success';
            }
          } catch (e) {
            this.authErr = e.message;
            console.log(e);
          }
        } else {
          try {
            isVerified = await this.auth.verifyWithFallback();
            if (isVerified) {
              this.authErr = 'success';
            }
          } catch (error) {
            this.authErr = error.message;
            console.log(error);
          }
        }
      } */

    // });
    // this.getCards();
    // this.savedCards = this.cardService.getSavedCards();
  }

  /* async getCards() {
    let t = await this.cardService.getFromStorage('cards', true);
    console.log(t);
  } */

  ngOnDestroy(): void {
    this.cardsUpdated.unsubscribe();
  }

}
