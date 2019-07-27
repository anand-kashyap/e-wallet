import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../cards.service';
import { Card } from '../card.models';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  loadedCard: Card;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cardsService: CardsService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('cardId')) {
        this.router.navigate(['/']);
        return;
      }
      const cardId = parseInt(params.get('cardId'), 10);
      this.cardsService.getCardDetail(cardId).then(card => this.loadedCard = card);
      console.log(this.loadedCard);
    });
  }

  copyText(val: string) {
    this.cardsService.copyToClipboard(val);
    this.cardsService.showToast();
  }

}
