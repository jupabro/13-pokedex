import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
            id: id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
      })
    );
  }
}
