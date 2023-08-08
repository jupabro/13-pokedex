import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/shared/services/pokedex.service';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss']
})
export class PokedexPageComponent implements OnInit {

  pokemons: any[] = []
  pokemonDetail: Pokemon | null = null
  isClosed = true

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    this.pokedexService.pokemons$.subscribe((pokemons) => {
      this.pokemons = pokemons;
    })
    this.pokedexService.loadPokemons()
  }

  loadMore() {
    this.pokedexService.loadPokemons()
  }

  onPokemonClicked(pokemon: Pokemon) {
    this.pokemonDetail = pokemon
    this.isClosed = false
  }

  close() {
    this.isClosed = true
  }

  open() {
    this.isClosed = false
  }

}
