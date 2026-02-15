import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent {

  searchText: string = '';

  suggestions = [
    {
      id: 1,
      title: 'SuggestionTest',
      description: 'Ceci est une description suffisamment longue pour respecter la validation des 30 caractères.',
      category: 'Sécurité',
      date: new Date(),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  likeSuggestion(s: any) {
    s.nbLikes++;
  }

  addToFavorites(s: any) {
    console.log('Ajouté aux favoris:', s);
  }

}
