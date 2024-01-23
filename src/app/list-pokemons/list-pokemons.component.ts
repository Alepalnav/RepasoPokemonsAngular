import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../interfaces/Pokemon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-list-pokemons',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './list-pokemons.component.html',
  styleUrl: './list-pokemons.component.css'
})
export class ListPokemonsComponent {

  pokemons: Pokemon[]=[];
  @Input('search') name:string="";

  constructor(
    private servicio: PokemonsService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    if(this.name){
      this.route.params.subscribe({
        next:(params)=>{
          this.name=params['search'];
          this.pokemons=this.servicio.searchPokemon(this.name);
        }
      })
    }else{ 
      this.servicio.getPokemons().subscribe((pokemonsList)=> {
        this.pokemons=pokemonsList;
      }
      )
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.name){
      this.route.params.subscribe({
        next:(params)=>{
          this.name=params['search'];
          this.pokemons=this.servicio.searchPokemon(this.name);
        }
      })
    }else{ 
      this.servicio.getPokemons().subscribe((pokemonsList)=> {
        this.pokemons=pokemonsList;
      }
      )
    }  }

  goToDetails(id: number){
    this.router.navigate(['/pokemons',id])
}

}



