import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  private url = 'https://pokeapi.co/api/v2';

  getPokemons(limit: number): Observable<any[]> {
    const url = `${this.url}/pokemon?limit=${limit}`;

    return this.http.get<any>(url).pipe(

      map((response: any) => {
        return response.results.map((pokemon: any) => {
          const id = pokemon.url.split('/')[6];
          return {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            description: null // Update description in the following
          };
        });
      }),
      mergeMap((pokemons: any[]) => {
        // mergeMap: transforms the array of pokemon objects into an array of observables that each fetch the description
        const descriptionObservables = pokemons.map((pokemon: any) => {
          return this.getPokemonDescription(pokemon.name).pipe(
            map((response: any) => {
              return { ...pokemon, description: response.description };
            })
          );
        });
        // ForkJoin: waits for the descriptionObservables to complete and emits final array 
        return forkJoin(descriptionObservables);
      })
    );
  }

  private getPokemonDescription(pokemonName: string): Observable<any> {
    const url = `${this.url}/pokemon-species/${pokemonName}/`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return {
          description: response.flavor_text_entries[0].flavor_text
        };
      })
    );
  }
}

