import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

  suggestions: Suggestion[] = [];
  searchText: string = '';

  constructor(private service: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  // 🔄 Charger les suggestions depuis backend
  loadSuggestions(): void {
    this.service.getSuggestionList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur chargement suggestions:', err);
      }
    });
  }

  // 🔍 Filtre recherche sécurisé (strict mode safe)
  matchesSearch(s: Suggestion): boolean {
    const search = (this.searchText || '').toLowerCase();
    if (!search) return true;

    return (
      (s.title || '').toLowerCase().includes(search) ||
      (s.category || '').toLowerCase().includes(search)
    );
  }

  // 👍 Like
  likeSuggestion(s: Suggestion): void {
    const updatedLikes = (s.nbLikes || 0) + 1;

    this.service.updateLikes(s.id, updatedLikes).subscribe({
      next: () => {
        s.nbLikes = updatedLikes;
      },
      error: (err) => {
        console.error('Erreur update likes:', err);
      }
    });
  }

  // 🗑 Delete
  deleteSuggestion(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette suggestion ?')) {
      this.service.deleteSuggestion(id).subscribe({
        next: () => {
          this.loadSuggestions();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }

}