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

  onClick(pokemon: Pokemon): void {
    this.pokemonClicked.emit(pokemon);
  }
}
