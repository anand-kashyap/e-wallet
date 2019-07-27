import { CARD_VALIDATIONS } from './../cards.validation';
import { CardsService } from './../cards.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Card, CCard } from './../card.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
  addCardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(4)]),
    holderName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    cardNickName: new FormControl(''),
  });
  cardValidations = CARD_VALIDATIONS;

  constructor(private cardsService: CardsService, private router: Router) { }

  ngOnInit() {
  }

  getValidationError(formcontrol, formgroup, validations) {
    return this.cardsService.getValidationErrors(formcontrol, formgroup, validations);
  }

  addCard() {
    if (this.addCardForm.valid) {
      console.log(this.addCardForm.value);
      const card = this.addCardForm.value;
      // card.cardId = this.cardsService.getSavedCards().length + 1;
      this.cardsService.getSavedCards().then(cards => {
        card.cardId = cards.length + 1;
        console.log('submitted');
        const newCard: Card = new CCard(card);
        // newCard.cardId = 3;
        this.cardsService.addCard(newCard).then(res => {
          this.router.navigate(['/']);
        });
      });
    } else {
      this.cardsService.markFieldsAsDirty(this.addCardForm);
    }

  }

}
