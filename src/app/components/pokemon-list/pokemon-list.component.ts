import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  @Input() pokemons: Pokemon[] = []

  @Output() pokemonClicked: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  fallbackImageUrl = '../../../assets/pokemon-1888657_640.png';

  onClick(pokemon: Pokemon): void {
    this.pokemonClicked.emit(pokemon);
  }

  onImageError(pokemon: Pokemon) {
    pokemon.image = this.fallbackImageUrl;
  }
}
