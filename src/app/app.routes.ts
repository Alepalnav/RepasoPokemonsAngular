import { Routes } from '@angular/router';
import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';
import { DetailsComponent } from './details/details.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';

export const routes: Routes = [
    {path:'', component:ListPokemonsComponent},
    {path:'pokemons', component:ListPokemonsComponent,
        children: [
            {path:':id',component:DetailsComponent}
        ]},
    // {path:'pokemons/:id', component:DetailsComponent},
    {path:'add', component:AddPokemonComponent},
    {path:'edit/:id', component:AddPokemonComponent},
    {path: 'search/:search', component: ListPokemonsComponent},

];
