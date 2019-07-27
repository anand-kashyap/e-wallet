export interface Card {
  cardId: number;
  cardNumber: number;
  expiryDate: string;
  cvv: number;
  holderName: string;
  cardNickName: string;
}

export class CCard implements Card {
  cardId: number;
  cardNumber: number;
  expiryDate: string;
  cvv: number;
  holderName: string;
  cardNickName: string;
  constructor(
    newCard: Card) {
    this.cardId = newCard.cardId;
    this.cardNumber = newCard.cardNumber;
    this.expiryDate = newCard.expiryDate;
    this.cvv = newCard.cvv;
    this.holderName = newCard.holderName;
    this.cardNickName = newCard.cardNickName;
  }
}
