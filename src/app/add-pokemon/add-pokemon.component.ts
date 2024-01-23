import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonsService } from '../services/pokemons.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-pokemon.component.html',
  styleUrl: './add-pokemon.component.css'
})
export class AddPokemonComponent {

  pokemon: Omit<Pokemon,'id'> = {
    name: {
      english: '',
      japanese: '',
      chinese: '',
      french: ''
    },
    type: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      Speed: 0
    },
    species: '',
    description: '',
    evolution: { next: ['',''] },
    profile: {
      height: '',
      weight: '',
      egg: [''],
      ability: [['', false]],
      gender: ''
    },
    image: {
      sprite: '',
      thumbnail: '',
      hires: ''
    }
  }

  exito : boolean = false;
  @Input() id!: number;
  edit : boolean = false;

  constructor(private servicio: PokemonsService){}

  ngOnInit(): void {
    if (this.id) {
      this.servicio.getPokemon(this.id)
      .subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.edit = true;
        },
        error: (error) => console.log(error)
        
      })
    }
    
  }
  submit(){
    if (this.edit) {
      
      this.servicio.updatePokemon(this.id, this.pokemon)
      .subscribe({
        next: (pokemon) => this.exito = true
      })
    }
    else{
    this.servicio.addPokemon(this.pokemon)
      .subscribe({
        next: (pokemon) => {
          this.exito = true
          this.pokemon = {
            name: {
              english: '',
              japanese: '',
              chinese: '',
              french: ''
            },
            type: [],
            base: {
              HP: 0,
              Attack: 0,
              Defense: 0,
              "Sp. Attack": 0,
              "Sp. Defense": 0,
              Speed: 0
            },
            species: '',
            description: '',
            evolution: { next: ['',''] },
            profile: {
              height: '',
              weight: '',
              egg: [''],
              ability: [['', false]],
              gender: ''
            },
            image: {
              sprite: '',
              thumbnail: '',
              hires: ''
            }
          }
        }
    })
  }
    
    
  }
}
