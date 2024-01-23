import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonsService } from '../services/pokemons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  @Input() id:number=0;

  pokemon!: Pokemon;

  constructor(
    private servicio: PokemonsService,
    private router:Router
  ){}

  ngOnInit():void {

    this.servicio.getPokemon(this.id).subscribe(response=>{
      this.pokemon=response;
    })

  }

  return(){
    this.router.navigate(['/pokemons'])
  }

  edit(id: number){
    this.router.navigate(['edit', id])
  }

  delete(id:number){
    this.servicio.deletePokemon(id).subscribe({
      next: ()=> 
      this.router.navigate(['/pokemons'])
    });
  }

  // delete(id: number){
  //   this.minionsService.deleteMinion(id).subscribe({
  //     next: () => this.minions$ = this.minionsService.getMinions()
  //   })

  // }

}
