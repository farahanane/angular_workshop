import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { SuggestionsModule } from './features/suggestions/suggestions.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListSuggestionComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,   
    ReactiveFormsModule, 
    AppRoutingModule,
    SuggestionsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }