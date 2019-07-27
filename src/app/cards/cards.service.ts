import { Injectable } from '@angular/core';
import { Card } from './card.models';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { Plugins } from '@capacitor/core';
// import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';

// const { Clipboard, CapacitorDataStorageSqlite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  savedCardsLive = new Subject<Card[]>();

  constructor(private toastController: ToastController, private nativeStorage: NativeStorage) {
   }

  getSavedCards(): Promise<Card[]> {
    return this.getFromStorage('cards', true).then(cards => {
      // this.savedCards = cards;
      if (cards === null) {
        return [];
      }
      return [...cards];
    });
  }

  addCard(newCard: Card) {
    return this.getSavedCards().then(cardArr => {
      cardArr.push(newCard);
      return this.saveToStorage('cards', cardArr).then(cards => this.savedCardsLive.next([...cards]));
    });
    // this.savedCards.push(newCard);
    // this.savedCardsLive.next([...this.savedCards]);
    // return [...this.savedCards];
  }

  getSubject() {
    return this.savedCardsLive.asObservable();
  }

  getCardDetail(cardId: number): Promise<Card> {
    return this.getSavedCards().then(cards => cards.find(c => c.cardId === cardId));
  }

  copyToClipboard(val: string) {
    /* Clipboard.write({
      string: val
    }); */
    console.log('copied');
  }

  showToast() {
    this.toastController.create({
      message: 'Copied!',
      position: 'bottom',
      duration: 1000,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(toast => toast.present());
  }

  getValidationErrors(formControl: string, formGroup, validations): string {
    const errorField = validations[formControl];

    for (const i in errorField) {
      if (formGroup.get(formControl).hasError(errorField[i].type)) {
        return errorField[i].message;
      }
    }
  }

  // Method to mark all form fields as dirty
  markFieldsAsDirty(formGroup) {
    Object.keys(formGroup.controls).forEach(formControl => {
      const control = formGroup.get(formControl);
      control.markAsDirty({ onlySelf: true });
    });
  }

  getStorageVal(key: string) {
    return this.nativeStorage.getItem(key)
    .then(
      data => {
        console.log(data);
        return data;
      },
      error => {
        console.log(error);
        throw new Error(error);
      }
    );
    /* let storage: any = {};
    const info = await Device.getInfo();
    console.log('platform ', info.platform);
    if (info.platform === 'ios' || info.platform === 'android') {
      storage = CapacitorDataStorageSqlite;
    } else {
      storage = CapacitorSQLPlugin.CapacitorDataStorageSqlite;
    }
    return storage; */
  }

  async saveToStorage(key: string, value: any, isString = false) {
    // const storage = await this.getStorageVal();
    let json;
    if (!isString) {
      json = value;
      value = JSON.stringify(value);
    }
    await this.nativeStorage.setItem(key, value);
    return json;
  }

  getFromStorage(key: string, json = false) {
    return this.nativeStorage.getItem(key)
    .then(
      data => {
        console.log(data);
        if (json && data !== null) {
          JSON.parse(data);
        }
        return data;
      },
      error => {
        console.log(error);
        throw new Error(error);
      }
    );
    /* const storage = await this.getStorage();
    const result = await storage.get({key});
    // console.log('result ', result);
    if (result.value !== null && json) {
      return JSON.parse(result.value);
    }
    return result.value; */
  }

}
