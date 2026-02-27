import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  id!: number;
  suggestion!: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  this.service.getSuggestionById(this.id).subscribe(suggestion => {
  this.suggestion = suggestion;
});
}

  deleteSuggestion(): void {
    if (confirm('Voulez-vous vraiment supprimer cette suggestion ?')) {
      this.service.deleteSuggestion(this.id).subscribe({
        next: () => {
          this.router.navigate(['/suggestions']);
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }

  updateSuggestion(): void {
    this.router.navigate(['/suggestions/add', this.id]);
  }

  back(): void {
    this.router.navigate(['/suggestions']);
  }

}