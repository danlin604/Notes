/* -------------------------------------------------- */
  TypeScript
/* -------------------------------------------------- */

Superset of JavaScript

  Any valid JavaScript code will work.

TypeScript --> Transpiles --> JavaScript


// Installing

  npm install -g typescript

  tsc --version


// Getting started

  mkdir typescript // create dir

  code main.ts // create & open file


// Hello World

  function log(message) {
      console.log(message);
  }
  var message = 'Hello World';
  log(message);


  $ tsc main.ts // transpiles --> main.js

  // Transpile and run main.js
  $ tsc main.ts | node main.js


// NOTE

  By default, TypeScript compiles to ES5, which does not have let keyword, instead var is used.

  // main.ts
  function x() {
      for (let i = 0; i < 5; i++) {
          console.log(i);
      }
      console.log(i);
  }
  x();

  // main.js
  function x() {
      for (var i = 0; i < 5; i++) { // var is scoped differently
          console.log(i);
      }
      console.log(i);
  }
  x();



/* -------------------------------------------------- */
  Types
/* -------------------------------------------------- */

// ts

  let count = 5;
  count = 'a'; // type error

  // Code will transpile correctly, because this is valid JS


// Types 

  let a: any;
  let a: number;
  let a: boolean;
  let a: string;
  let a: number[] = [1, 2, 3];
  let a: any[] = [1, true, 'a', false];

// Enum

  enum Color { Red = 0, Green = 1, Blue = 2 }; // Explicit # for maintainability
  let backgroundColor = Color.Red;


// Type Assertions

  let message; // : any
  message = 'abc';
  let endsWithC = (<string>message).endsWith('c');
  let alternative = (message as string).endsWith('c');


// arrow function

  // normal function
  let log = function(message) {
    console.log(message);
  }

  // ts
  let log = (message) => { 
    console.log(message) 
  };

  // or
  let log = (message) => console.log(message);

  // no param
  let log = () => console.log();


// Custom types

  interface Point() {
    x: number,
    y: number
  }

  let drawPoint = (point: Point) => {
    // ...
  }

  let getDistance = (pointA: Point, pointB: Point) => {
    // ...
  }

  drawPoint({
    x: 1,
    y: 3
  })



/* -------------------------------------------------- */
  Class 
/* -------------------------------------------------- */

OO values Cohesion!

/* Interface Implementation
  
  interface Point() {
    x: number,
    y: number,
    drawPoint: () => void
  }
*/

  // cohesive class
  class Point {
      x: number;
      y: number;

      constructor(x?: number, y?: number) { // ? is optional
          this.x = x;
          this.y = y;
      }
      
      draw() {
          console.log('x: ' + this.x, ', y: ' + this.y);
      }

      getDistance(another: Point) {
          // ...
      }
  }

  let point: Point = new Point();
  point.draw();



// Access Modifiers

  class Point {
      private x: number;
      private y: number;

      constructor(x?: number, y?: number) { // ? is optional
        // ...
      }
  }

// NOTE 

  public is default


// Simplified

  class Point {
      constructor(private x?: number, public y?: number) {
          // typescript will generate param variables
      }
  }



// Getter and Setter

  // cohesive class
  class Point {
      constructor(private _x?: number, private _y?: number) {
          // typescript will generate param variables
      }
      
      draw() {
          console.log('x: ' + this.x, ', y: ' + this.y);
      }

      getDistance(another: Point) {
          // ...
      }

      get x() {
          return this.x;
      }

      getY() {
          return this.y;
      }

      set x(value) {
          if (value < 0) {
              throw new Error('value cannot be less than 0');
          }
      }

      setY(value) {
          if (value < 0) {
              throw new Error('value cannot be less than 0');
          }
      }
  }

  let point: Point = new Point();
  let x = point.x;
  let y = point.getY();
  point.x = x;
  point.setY(5);
  point.draw();



/* -------------------------------------------------- */
  Modules
/* -------------------------------------------------- */

// point.ts

  export class Point {
      constructor(private _x?: number, private _y?: number) {
          // typescript will generate param variables
      }
      
      draw() {
          console.log('x: ' + this._x, ', y: ' + this._y);
      }
  }

// main.ts

  import { Point } from './point';

  let point: Point = new Point(1, 2);
  point.draw();



// Example

  // like.component.ts
  export class LikeComponent {
      constructor(private _likesCount: number, private _isSelected: boolean) { 
          // init variables
      }

      onClick() {
          this._likesCount += (this._isSelected) ? -1 : +1;
          this._isSelected = !this._isSelected; // toggle
      }

      get likesCount() {
          return this._likesCount;
      }

      get isSelected() {
          return this._isSelected;
      }
  }

  // main.ts
  import { LikeComponent } from './like.component';

  let component = new LikeComponent(10, true);
  component.onClick();
  console.log(`likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`);

// target ES5 or heigher40

  tsc *.ts -- target ES5 && node main.js



/* -------------------------------------------------- */
    Building blocks of Angular Apps
/* -------------------------------------------------- */

// Components

    Encapsulates:

        Data
        HTML Template
        Logic

        ... for a view.

        eg. navbar component, sidebar component, etc

    Component based archetecture.

    // Example Component Structure

        App
            Navbar
            Courses
                Rating
            Sidebar


// Modules

    Container or group of related components.

    // Example

        Course Module
            All components for displayign courses

        Messaging Module
            Area where you can side private message to instructor.

        Instructor Module
            Contains the components for instructor dashboard unseen by students.

        Admin Module
            Area of website managed by staff.

    // Analogy

        Supermarket aisles

            Bigger the market, more aisles




/* -------------------------------------------------- */
    Components  
/* -------------------------------------------------- */

// Components

    1. Create a component
    2. Register it in a module
    3. Add an element in an HTML markup

    To add a new component...

        src --> app --> name.component.ts


// Create courses.component.ts

    import { Component } from '@angular/core';

    @Component({
        selector: 'courses', // <courses>
        //selector: '#courses', // <div id="courses">
        template: '<h2>Courses</h2>' // Rendered HTML Template

    })
    export class CoursesComponent {
        
    }


// Register in module (eg. app.module.ts)

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    import { CoursesComponent } from './courses.component'; // New

    @NgModule({
      declarations: [
        AppComponent,
        CoursesComponent // New
      ],
      imports: [
        BrowserModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    

// app.component.html

/*
    <h1>Angular</h1>
    <courses></courses>
*/


// <app-root> app.component.ts

    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root', // render template inside specified element
      templateUrl: './app.component.html', // external template
      styleUrls: ['./app.component.css'] // external style
    })
    export class AppComponent {
      title = 'Angular App';
    }




There are too many steps and too much boilerplate code! There is a quicker and more reliable way to create a new component.

    $ng g c name // g = generate; c = component

 

/* -------------------------------------------------- */
    Data Binding 
/* -------------------------------------------------- */

// courses.components.ts

    import { Component } from '@angular/core';

    @Component({
        selector: 'courses',
        template: '<h2>{{ title }}</h2>' // {{ value }}
    })
    export class CoursesComponent {
        title = "List of courses";  // var
    }


    // We can apply JavaScript to render our template.

        template: `<h2>{{ 'Title: ' + title }}</h2>`

        // Alternatively

        @Component({
            selector: 'courses',
            template: '<h2>{{ getTitle }}</h2>'

        })
        export class CoursesComponent {
            title = "List of courses";

            getTitle() {
                return this.title
            }
        }



{{ value }}

    We call this syntax screen interpolation.



/* -------------------------------------------------- */
    Directives  
/* -------------------------------------------------- */

// Example

    import { Component } from '@angular/core';

    @Component({
        selector: 'courses',
        template: `
            <h2>{{ title }}</h2>
            <ul>
                <li *ngFor="let course of courses">
                    {{ course }}
                </li>
            </ul>
        `
    })
    export class CoursesComponent {
        title = "List of courses";
        courses = ['course1', 'course2', 'course3'];
    }


/* -------------------------------------------------- */
    Service
/* -------------------------------------------------- */

app --> name.service.ts

A component should not contain logic aside from the presentation logic. A service can be used by multiple components.

We want to provide a fake implementation of a service to test.


// courses.service.ts

    export class CoursesService {
        getCourses() {
            return ['course1', 'course2', 'course3'];
        }
    }

// course.component.ts

    import { CoursesService } from './courses.service';
    import { Component } from '@angular/core';

    @Component({
        selector: 'courses',
        template: `
            <h2>{{ title }}</h2>
            <ul>
                <li *ngFor="let course of courses">
                    {{ course }}
                </li>
            </ul>
        `
    })
    export class CoursesComponent {
        title = "List of courses";
        courses;

        constructor() {
            let service = new CoursesService; // service still tightly coupled
            this.courses = service.getCourses();
        }
    }



// BETTER decoupled

    // Dependency injection - providing the dependency of a class in its constructor

    export class CoursesComponent {
        title = "List of courses";
        courses;

        // Decouple class from dependency - Dependency Injection
        constructor(service: CoursesService) { // Need to register dependency in our module
            this.courses = service.getCourses();
        }
    }

// register dependency to module: app.module.ts

    import { CoursesService } from './courses.service';

    @NgModule({
      declarations: [
        AppComponent,
        CoursesComponent,
        CourseComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [
        CoursesService // Single instance created for module, Singleton
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }



// Create Service with Angular CLI

    $ng g s email

        // g = generate
        // s = service

        // email.service.ts

            import { Injectable } from '@angular/core';

            @Injectable()
            export class EmailService {
              constructor() { }
            }


/* -------------------------------------------------- */
    Property Binding
/* -------------------------------------------------- */

// Example
/*
    <h1 [textContent]="title"></h1>
    <img src="{{ imageUrl }}" />
    <img [src]="imageUrl" />

    Bound to a field or property in our TypeScript class
*/
        
// Attribute binding

    Majority of the HTML attributes have a 1:1 representation in the DOM. Not ALL.

/*
    <td [colspan]="colSpan"></td> // ERROR
    <td [attr.colspan]="colSpan"></td> // WORKING
*/



/* -------------------------------------------------- */
    Adding Bootstrap
/* -------------------------------------------------- */

$ npm install bootstrap --save

    // entry added to package.json

    // We do not want to checkin out node_modules folder to our repo because there are a lot of libraries. Dependencies are listed, so all you need is ...

    $ npm install // installs all required packages


// import bootstrap to styles.css

    @import "~bootstrap/dist/css/bootstrap.css";

    body {
        padding: 20px;
    }

// useing bootstrap in courses.component.ts

    template: `
        <button class="btn btn-primary">Save</button>
    `    

/* -------------------------------------------------- */
    Class Binding
/* -------------------------------------------------- */

// courses.component.ts

    @Component({
        selector: 'courses',
        template: `
            <button class="btn btn-primary" [class.active]="isActive">Save</button>
        `
    })
    export class CoursesComponent {
        // isActive = true; // <button class="btn btn-primary active">Save</button>
        isActive = false; // <button class="btn btn-primary">Save</button>
    }


// If condition is true, this target class will be added to the element. False will remove the class from the element.



/* -------------------------------------------------- */
    Style Binding
/* -------------------------------------------------- */

Search for: DOM Style object properties.

// Example

    @Component({
        selector: 'courses',
        template: `
            <button [style.backgroundColor]="isActive ? 'blue' : 'white'">Save</button>
        `
    })
    export class CoursesComponent {
        isActive = false; // white background
    }



/* -------------------------------------------------- */
    Event Binding
/* -------------------------------------------------- */

// Example

    @Component({
        selector: 'courses',
        template: `
            <button (click)="onSave()">Save</button>
        `
    })
    export class CoursesComponent {
        onSave() {
            console.log('Button was clicked!');
        }
    }



// Event object

    @Component({
        selector: 'courses',
        template: `
            <button (click)="onSave($event)">Save</button>
        `
    })
    export class CoursesComponent {
        onSave($event) {
            console.log('Button was clicked!', $event);
        }
    }


// Event bubbling

    Event bubbles up the DOM tree.


    @Component({
        selector: 'courses',
        template: `
            <div (click)="onDivClicked()">
                <button (click)="onSave($event)">Save</button>
            </div>
        `
    })
    export class CoursesComponent {
        onSave($event) {
            console.log('Button was clicked!', $event);
        }

        onDivClicked() {
            console.log('Div was clicked!');
        }
    }
    /*
        Button was clicked!
        Div was clicked!
    */


// Stop Event Bubbling

    onSave($event) {
        $event.stopPropagation();
        console.log('Button was clicked!', $event);
    }



/* -------------------------------------------------- */
    Event Filtering
/* -------------------------------------------------- */




/* -------------------------------------------------- */

/* -------------------------------------------------- */



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
* Udemy Angular 4
*******************************************************/


// Setup

  npm install -g @angular/cli

  ng --version

  ng new hello-world

  ng serve


// file structure

  // e2e // end to end

    end to end tests that simulate real users

  // node modules

    store 3rd party libraries, purely for development

    part of these are bundled for deployment

  // src

    source code for the application

    // app

    // assets

      aethetic assets

    // enviroments

      configs for different enviroments

      // main.ts

        starting point of our app

      // polyfill.ts

      // styles.css

        global styles

  // editorconfig
  
    all devs should use the same 

  // karma.confi.js

    test

  // package.json

    dependencies

    devDependencies

  // tsconfig.json

    typescript compiler config

  // tslint.json

    checks your typescript code

    






/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/


/*******************************************************
* 
*******************************************************/