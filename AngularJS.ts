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

Generate pipe

  ng g pipe name

Generate Service 

  ng g s name 

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

/* directory.component.html 

  <p [ngClass]="{
    'blue': false, 
    'red': true,
    'underline': false 
  }">
    directory works!
  </p>

  <style>
    .blue{color: blue;}
    .red{color: red;}
    .underline{text-decoration: underline;}
  </style>
*/
OR
/* directory.component.ts */
classes = {
  'blue': true, 
  'red': false,
  'underline': false 
}; 
/* directory.component.html

  <p [ngClass]="classes">
    directory works!
  </p>
*/







/* Structural Directive */

/* ngIf */
/* directory.component.html

  <p *ngIf="true">Only show if test is true</p>
*/
OR
/* directory.component.ts */
export class DirectoryComponent implements OnInit {
  test = true;
}
/* directory.component.html

  <p *ngIf="test">Only show if test is true</p>
*/








/* ngFor */

/* directory.component.ts */
  ninjas = [
    {name: "Yoshi", belt: "green"},
    {name: "Ryu", belt: "red"},
    {name: "Dr. McNinja", belt: "black"}
  ]
/* directory.component.html 

<ul id="ninja-listing">
  <li *ngFor="let ninja of ninjas">{{ninja.name}}</li>
</ul>
*/


/* directory.component.html 

<ul id="ninja-listing">
  <li *ngFor="let ninja of ninjas">
    <div class="single-ninja">
      <!-- Belt Colour -->
      <span [ngStyle]="{background: ninja.belt}">{{ninja.belt}} belt</span>
      <!-- Ninja Name -->
      <h3>{{ninja.name}}</h3>
    </div>
  </li>
</ul>
*/




/*******************************************************
* Pipes
*******************************************************/

Why use pipes over functions?

/* directory.component.html

  <h3>{{ninja.name | uppercase | slice:1:3}}</h3>
*/



/* custom pipe filter */

ng g pipe filter

/* filter.pipes.ts */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ninjas: any, term: any): any {
    // check if search is undefined
    if (term === undefined) return ninjas;
    
    //return updated ninjas array
    return ninjas.filter(function(ninja) {
      return ninja.name.toLowerCase().includes(term.toLowerCase());
    })
  }
}

/* directory.component.html 

  <form id="filter">
    <label>Filter ninjas by name</label>
    <input type="text" [ngModelOptions]="{standalone:true}" [(ngModel)]="term"/>
  </form>

  <ul id="ninja-listing">
  <li *ngFor="let ninja of ninjas | filter:term">
    <div class="single-ninja">
      <!-- Belt Colour -->
      <span [ngStyle]="{background: ninja.belt}">{{ninja.belt}} belt</span>
      <!-- Ninja Name -->
      <h3>{{ninja.name}}</h3>
    </div>
  </li>
*/


/*******************************************************
* Service
*******************************************************/

ng g s name 


/* Multiple instance service */

/* logging.service.ts */
import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
  log() {
    console.log('I am the logging service');
  }
  constructor() { }
}

/* directory.component.ts */
import { LoggingService } from '../logging.service';

@Component({
  providers: [LoggingService]
})
export class DirectoryComponent implements OnInit {

  constructor(private logger: LoggingService) { }

  logIt() {
    this.logger.log();
  }
}

/* directory.component.html 

  <button (click)="logIt()">Log Me</button>
*/




/* single instance service */

/* app.module.ts */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DirectoryComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})

/* directory.component.ts */
@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})

/*******************************************************
* Read dummy JSON data
*******************************************************/

/* ninjas.json */
[
  {
    "name": "Yoshi", 
    "belt": "green"
  },
  {
    "name": "Ryu", 
    "belt": "red"
  },
  {
    "name": "Dr. McNinja", 
    "belt": "pink"
  }
]

/* data.service.ts */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http ) { }

  fetchData() {
    return this.http.get('../assets/ninjas.json').map(
      (res) => res.json()
    );
  }
}

/* app.module.ts */
providers: [LoggingService, DataService]

/* directory.component.ts */
import { DataService } from '../data.service';

export class DirectoryComponent implements OnInit {
  ninjas = [];

  constructor(private logger: LoggingService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe(
      (data) => this.ninjas = data
    );
  }
}

/*******************************************************
* 
*******************************************************/



/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/