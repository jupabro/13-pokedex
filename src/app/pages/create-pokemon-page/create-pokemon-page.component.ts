import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-pokemon-page',
  templateUrl: './create-pokemon-page.component.html',
  styleUrls: ['./create-pokemon-page.component.scss']
})
export class CreatePokemonPageComponent implements OnInit {
  pokemonForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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

    console.log(this.pokemonForm.value);

  }

}
