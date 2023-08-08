import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokedexService } from 'src/app/shared/services/pokedex.service';

@Component({
  selector: 'app-create-pokemon-page',
  templateUrl: './create-pokemon-page.component.html',
  styleUrls: ['./create-pokemon-page.component.scss']
})
export class CreatePokemonPageComponent implements OnInit {
  pokemonForm!: FormGroup;
  successfulCreation = false;

  constructor(private formBuilder: FormBuilder, private pokedexservice: PokedexService) { }

  ngOnInit() {
    this.pokemonForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(100)]]
    });
  }

  get nameControl() {
    return this.pokemonForm.get('name');
  }

  get imageControl() {
    return this.pokemonForm.get('image');
  }

  get descriptionControl() {
    return this.pokemonForm.get('description');
  }

  onSubmit() {
    const newPokemon: Pokemon = this.pokemonForm.value
    this.pokedexservice.addPokemon(newPokemon)
    this.pokemonForm.reset();
    this.successfulCreation = true;
  }

}
