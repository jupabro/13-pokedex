import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/shared/services/pokedex.service';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss']
})
export class PokedexPageComponent implements OnInit {

  pokemonList: any[] = []
  test = ""

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokedexService.getPokemons(20).subscribe(
      (data) => {
        this.pokemonList = data
        console.log(this.pokemonList)
      }
    )
  }

}
