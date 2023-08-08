import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {

  fallbackImageUrl = '../../../assets/pokemon-1888657_640.png';
  @Input() pokemon: Pokemon | null = null

  onImageError() {
    if (this.pokemon) {
      this.pokemon.image = this.fallbackImageUrl;
    }
  }
}
