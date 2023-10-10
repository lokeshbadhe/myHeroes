import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  defaultImage: string = '/assets/noimage.jpg'; 
  superheroes: any[] = []; 
  

constructor(private superheroService:UserService,){}
ngOnInit(): void {
  this.superheroService.getAllSuperheroesData().subscribe(
    (superheroesData) => {
      this.superheroes = superheroesData.filter((superhero) => superhero !== null);
      console.log('All Superheroes Data:', this.superheroes);
    },
    (error) => {
      console.error('Error fetching superhero data:', error);
    }
  );
}



}
