import { Component } from '@angular/core';
import { PokedexService } from 'src/app/shared/services/pokedex.service';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss']
})
export class PokedexPageComponent {

  pokemons: any[] = []
  pokemonDetail: Pokemon | null = null
  isClosed = true

  constructor(private pokedexService: PokedexService) {
    this.loadMore();
  }

  loadMore() {
    this.pokedexService.getPokemons().subscribe((pokemons) => {
      this.pokemons = [...this.pokemons, ...pokemons];
    });
  }

  onPokemonClicked(pokemon: Pokemon) {
    this.pokemonDetail = pokemon
    this.isClosed = false
  }

  close() {
    this.isClosed = true
    console.log("closeclick", this.isClosed)
  }

}
