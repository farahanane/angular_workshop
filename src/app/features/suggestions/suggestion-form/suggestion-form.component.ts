import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  suggestionForm!: FormGroup;
  id!: number | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SuggestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.suggestionForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    status: ['pending']
  });

  this.id = this.route.snapshot.params['id'];

  if (this.id) {
  this.service.getSuggestionById(this.id).subscribe(suggestion => {
    this.suggestionForm.patchValue({
      title: suggestion.title,
      description: suggestion.description,
      category: suggestion.category,
      status: suggestion.status
    });
  });
}
}

  onSubmit(): void {
    if (this.suggestionForm.valid) {

      const suggestionData: Suggestion = {
        ...this.suggestionForm.value,
        nbLikes: 0
      };

      // 🔵 UPDATE
      if (this.id) {
        this.service.updateSuggestion(this.id, suggestionData).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }

      // 🟢 ADD
      else {
        this.service.addSuggestion(suggestionData).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }

}