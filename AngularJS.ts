/*******************************************************
* Installation
*******************************************************/

install Node.JS

	node -v // check version

install Angular-CLI

	npm install -g angular-cli

create new project in dir

	ng new project_name

goto project_name

	ng serve

Start project

	npm start // inside project root

Generate component

  ng generate component name

  ng g c name

/*******************************************************
* 
*******************************************************/

import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}

/*******************************************************
* Select Hero Master/Detail
*******************************************************/

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template:`
    <h1>{{title}}</h1>

    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>

    <div *ngIf="selectedHero">
      <h2>{{selectedHero.name}} details!</h2>
      <div><label>id: </label>{{selectedHero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedHero.name" placeholder="name"/>
      </div>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

/*******************************************************
* 
*******************************************************/

/* app.component.ts */

import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template:`
    <h1>{{title}}</h1>

    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) { }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

/* hero.ts */

export class Hero {
  id: number;
  name: string;
}

/* mock-heroes */

import { Hero } from './hero';

export const HEROES: Hero[] = [
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'},
  {id: 15, name: 'Magneta'},
  {id: 16, name: 'RubberMan'},
  {id: 17, name: 'Dynama'},
  {id: 18, name: 'Dr IQ'},
  {id: 19, name: 'Magma'},
  {id: 20, name: 'Tornado'}
];

/* hero-detail.component.ts */

import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
  <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
  </div>
  `
})
export class HeroDetailComponent {
  @Input()
  hero: Hero;
}




/*******************************************************
* ng-content directive
*******************************************************/

Display the content in the component tag

/* app.component.html (parent)

  <section id="main">
    <app-home>blah blah blah!</app-home>
  </section>
*/

/* home.component.html (child)

  <p>
    home works!
  </p>
  <ng-content></ng-content> <!-- blah blah blah! goes here -->
*/

/*******************************************************
* Property Binding
*******************************************************/

Native HTML properties

  [value]="expression"

Built-in angular directives

  [ngClass]="expression"

Cutom-made properties

  [myProp]="expression"

/* home.component.html

  <!-- property binding -->
  <input [value]="myString" />
  <input [required]="myBoolean" />
*/
OR
/* home.component.html

  <!-- string interpolation -->
  <input value="{{myString}}" />
  <input required="{{myBoolean}}" />
*/

export class HomeComponent implements OnInit {
  homeTitle = "Welcome to the home component...";
  myString = "I like chicken";
  myBoolean = true;

  constructor() { }

  ngOnInit() {
  }
}

/*******************************************************
* Event Binding
*******************************************************/

Bind to native events (click events)
/*
  <button (click)="function">
*/

Bind to custom events
/*
  <app-home (update)="function"></app-home>
*/


/* home.component.html

  <button (click)="alertMe('vegan logic')">Click me</button>
*/
export class HomeComponent implements OnInit {
  // ...
  alertMe(val) {
    alert(val);
  }
  // ...
}


/*******************************************************
* Two-way Data Binding
*******************************************************/

/* home.component.html

  <!-- 2-way data binding -->
  <label>Title:</label>
  <input [(ngModel)]="spam.title" />

  <label>Body:</label>
  <input [(ngModel)]="spam.body" />

  <p>{{spam.title}}</p>
  <p>{{spam.body}}</p>
*/

spam = {
  title: 'hello',
  body: 'world'
};

/*******************************************************
* Cutsom Binding @Input
*******************************************************/

// Pass object between components

/* app.component.ts --> home.component.ts */
export class AppComponent {
  ninja = {
    name: 'Dr. McNinja',
    belt: 'Black'
  }
}
/* app.component.html

  <section id="main">
    <app-home [ninja]="ninja">content from app</app-home>
  </section>
*/

/* home.component.ts gets the input */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  inputs: ['ninja'] // gets the ninja object
})

/* home.component.html

  <p>{{ninja.name}}</p>
  <p>{{ninja.belt}}</p>
*/



/* Alternative - home.component.ts */
import { Component, OnInit, Input } from '@angular/core';

export class HomeComponent implements OnInit {
  @Input() ninja;
}


/*******************************************************
* Custom Event Binding @Output
*******************************************************/

/* home.component.html 

  <button (click)="fireYellEvent($event)">Hit me</button>
*/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export class HomeComponent implements OnInit {
  @Output() onYell = new EventEmitter();

  fireYellEvent(e) {
    this.onYell.emit(e);
  }
}

/* app.component.html listens for event onYell

  <app-home [ninja]="ninja" (onYell)="yell($event)"></app-home>
*/
export class AppComponent {
  yell(e) {
    alert('I am yelling!');
  }
}



/*******************************************************
* Routing
*******************************************************/

/* app.routes.ts */
import { DirectoryComponent } from "./directory/directory.component";
import { HomeComponent } from "./home/home.component";

export const APP_ROUTES = [ 
  { path: 'directory', component: DirectoryComponent },
  { path: '', component: HomeComponent }
];

/* app.module.ts */
import { APP_ROUTES } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ]...  
})

/* app.component.html 
  
  <router-outlet></router-outlet>
*/

/* index.html

  <head>
    <base href="/">
  </head>
*/





/* Routing RC5 */
/* app.routes.ts */
import { Routes, RouterModule } from '@angular/router';

import { DirectoryComponent } from "./directory/directory.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  }, 
  { 
    path: 'directory', 
    component: DirectoryComponent 
  }  
];
export const routing = RouterModule.forRoot(routes);

/* app.module.ts */
import { Routing } from './app.routes';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    Routing // Import
  ],
  ...
})
export class AppModule { }

/* app.component.html 

  <router-outlet></router-outlet>
*/





/* Router Link */
/* app.component.html 

  <li><a [routerLink]="['/']">Home</a></li>
  <li><a [routerLink]="['/directory']">Directory</a></li>
*/



/*******************************************************
* Directives
*******************************************************/

Attribute Directive 

  Interacts with the element its on to change its properties (ngClass)

Structural Directive

  Changes the actual structure of the HTML code


/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/