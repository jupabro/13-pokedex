import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { PokemonApiResponse, PokemonResult, PokemonDescription, PokemonDescriptionApiResponse } from '../models/pokemonApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  private url = 'https://pokeapi.co/api/v2';
  private currentOffset = 0;
  private limit = 20;

  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);

  public pokemons$ = this.pokemonsSubject.asObservable();

  loadPokemons() {
    this.fetchPokemons().subscribe((pokemons) => {
      const currentPokemons = this.pokemonsSubject.value
      this.pokemonsSubject.next([...currentPokemons, ...pokemons])
    })
  }

  private fetchPokemons(): Observable<Pokemon[]> {

    const url = `${this.url}/pokemon?offset=${this.currentOffset}&limit=${this.limit}`;

    return this.http.get<PokemonApiResponse>(url).pipe(

      map((response) => {
        return response.results.map((pokemon: PokemonResult) => {
          console.log("fetching")
          const id = pokemon.url.split('/')[6];
          return {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            description: "" // Update description in the following
          };
        });
      }),
      mergeMap((pokemons: Pokemon[]) => {
        // mergeMap: transforms the array of pokemon objects into an array of observables that each fetch the description
        const descriptionObservables = pokemons.map((pokemon: Pokemon) => {
          return this.getPokemonDescription(pokemon.name).pipe(
            map((response) => {
              return { ...pokemon, description: response.description };
            })
          );
        });
        // ForkJoin: waits for the descriptionObservables to complete and emits final array 
        return forkJoin(descriptionObservables);
      })
    )
  }

  private getPokemonDescription(pokemonName: string): Observable<PokemonDescription> {
    const url = `${this.url}/pokemon-species/${pokemonName}/`;
    return this.http.get<PokemonDescriptionApiResponse>(url).pipe(

      map((response) => {

        const englDescription = response.flavor_text_entries.find((entry) => entry.language.name === "en");

        if (englDescription) {
          const formattedDescription = englDescription.flavor_text.replace(/[\n\f]/g, " ").trim();
          return {
            description: formattedDescription
          };
        }
        return {
          description: ""
        };
      })
    );
  }
}

