import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private pokemons: Pokemon[]=[]

  // private url: string = "http://localhost:3000/pokemons/"
  private url: string = "http://localhost:3000/pokemons?_limit=20"

  constructor(private http: HttpClient) {
    console.log('servicio iniciado')
   }

   getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url);
  }

  getPokemon(id:Number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}${id}`);
  }

  addPokemon(pokemon: Omit<Pokemon,'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.url,pokemon)
  }

  updatePokemon(id: number, pokemon: Omit<Pokemon,'id'>):Observable<Pokemon>{
    return this.http.put<Pokemon>(`${this.url}${id}`,pokemon)
  }

  deletePokemon(id: number):Observable<Object>{
    return this.http.delete<Object>(`${this.url}${id}`)
  }

  searchPokemon(name: string): Pokemon[]{
    this.getPokemons().subscribe((pokemonsList)=> {
      this.pokemons=pokemonsList;
    })
    return this.pokemons.filter(pokemon => pokemon.name.english.toLowerCase().includes(name.toLowerCase()));
  }
  
}
