import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards',
    children: [
      {
        path: '',
        loadChildren: './cards/cards.module#CardsPageModule'
      },
      {
        path: 'getCard/:cardId',
        loadChildren: './cards/card-detail/card-detail.module#CardDetailPageModule'
      },
      {
        path: 'add',
        loadChildren: './cards/add-card/add-card.module#AddCardPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
