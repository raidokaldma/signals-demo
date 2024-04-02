import { AsyncPipe } from "@angular/common";
import {
  Component,
  computed,
  effect,
  signal,
  untracked,
  WritableSignal,
} from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, combineLatest, map, take } from "rxjs";

// https://angular.dev/guide/signals

@Component({
  standalone: true,
  template: `
    <h1>Lihtsamad näited</h1>
<pre>
Minu number: {{ myNumber() }}
Minu tekst: "{{ myText() }}"
</pre>
<button (click)="toggleCase()">Muuda teksti</button> 
<button (click)="randomizeMyNumber()">Suvaline number</button>
<button (click)="doubleMyNumber()">Duubelda</button>
`,
})
export class BasicsComponent {
  myNumber = signal(100);
  myText = signal("minu tekst");

  toggleCase() {
    this.myText.update((text) =>
      text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
    );
  }

  randomizeMyNumber() {
    this.myNumber.set(Math.floor(Math.random() * 1000));
  }

  doubleMyNumber() {
    this.myNumber.update((myNumber) => myNumber * 2);
  }
}











// computed()
/*
@Component({
  standalone: true,
  template: `
    <h1>Lihtsamad näited</h1>
<pre>
Minu number: {{ myNumber() }}
Minu tekst: "{{ myText() }}"
Minu arvutatud number: {{ myComputedNumber() }}
Minu tuletatud tekst: "{{ myComputedText() }}"
</pre>
<button (click)="toggleCase()">Muuda teksti</button>
<button (click)="randomizeMyNumber()">Suvaline number</button>
<button (click)="doubleMyNumber()">Duubelda</button>
`,
})
export class BasicsComponent {
  myNumber = signal(100);
  myText = signal("minu tekst");
  myComputedNumber = computed(() => -this.myNumber());
  myComputedText = computed(() =>
    `Minu tekst on: "${this.myText()}" ja mu negatiivne arv on: ${this.myComputedNumber()}`
  );

  toggleCase() {
    this.myText.update((text) =>
      text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
    );
  }

  randomizeMyNumber() {
    this.myNumber.set(Math.floor(Math.random() * 1000));
  }

  doubleMyNumber() {
    this.myNumber.update((myNumber) => myNumber * 2);
    // this.myComputedNumber.update((myNumber) => myNumber * 2) // myComputedNumber on arvutatud väärtus ja seda muuta ei saa
  }
}
*/











// effect()
/*
@Component({
  standalone: true,
  template: `
    <h1>Lihtsamad näited</h1>
<pre>
Minu number: {{ myNumber() }}
Minu tekst: "{{ myText() }}"
</pre>
<button (click)="toggleCase()">Muuda teksti</button>
<button (click)="randomizeMyNumber()">Suvaline number</button>
<button (click)="doubleMyNumber()">Duubelda</button>
`,
})
export class BasicsComponent {
  myNumber = signal(100);
  myText = signal("minu tekst");

  myEffect = effect(() => {
    console.log("Minu number on", this.myNumber(), "ja minu tekst on", this.myText());
  });

  toggleCase() {
    this.myText.update((text) =>
      text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
    );
  }

  randomizeMyNumber() {
    this.myNumber.set(Math.floor(Math.random() * 1000));
  }

  doubleMyNumber() {
    this.myNumber.update((myNumber) => myNumber * 2);
  }
}
*/











// effect() + untracked()
/*
@Component({
  standalone: true,
  template: `
    <h1>Lihtsamad näited</h1>
<pre>
Minu number: {{ myNumber() }}
Minu tekst: "{{ myText() }}"
</pre>
<button (click)="toggleCase()">Muuda teksti</button>
<button (click)="randomizeMyNumber()">Suvaline number</button>
<button (click)="doubleMyNumber()">Duubelda</button>
`,
})
export class BasicsComponent {
  myNumber = signal(100);
  myText = signal("minu tekst");

  // untracked() - saan väärtust lugeda effect() sees, aga väärtuse muutus ei käivita effecti()
  myEffect = effect(() => {
    // Siin näites this.myText muutus ei mõjuta effecti()
    console.log("Minu number on", this.myNumber(), "ja minu tekst on", untracked(this.myText));

    // console.log("Minu number on", this.myNumber());
    // untracked(() => { // <- untracked()
    //   console.log("ja minu tekst on", this.myText());
    // });
  });

  toggleCase() {
    this.myText.update((text) =>
      text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
    );
  }

  randomizeMyNumber() {
    this.myNumber.set(Math.floor(Math.random() * 1000));
  }

  doubleMyNumber() {
    this.myNumber.update((myNumber) => myNumber * 2);
  }
}
*/











// signal vs BehaviorSubject
/*
@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
<pre>
Minu number: {{ myNumber$.value }}
Minu tekst: "{{ myText$.value }}"
Minu arvutatud number: {{ myComputedNumber$ | async }} <!-- .value ei saa kasutada enam -->
Minu tuletatud tekst: {{ myComputedText$ | async }} <!-- .value ei saa kasutada enam -->
</pre>
    <button (click)="toggleCase()">Muuda teksti</button>
    <button (click)="randomizeMyNumber()">Suvaline number</button>
    <button (click)="doubleMyNumber()">Duubelda</button>
    <button (click)="printComputedValuesToConsole()">Prindi väärtused</button>
`,
})
@UntilDestroy()
export class BasicsComponent {
  // myNumber = signal(100);
  myNumber$ = new BehaviorSubject(100);

  // myText = signal("minu tekst");
  myText$ = new BehaviorSubject("minu tekst");

  // myComputedNumber = computed(() => -this.myNumber());
  myComputedNumber$ = this.myNumber$.pipe(map((myNumber) => -myNumber));

  // myComputedText = computed(() =>
  //   `Minu tekst on: "${this.myText()}" ja mu negatiivne arv on: ${this.myComputedNumber()}`
  // );
  myComputedText$ = combineLatest([this.myText$, this.myComputedNumber$]).pipe(
    map(([myText, myComputedNumber]) =>
      `Minu tekst on: "${myText}" ja mu negatiivne arv on: ${myComputedNumber}`
    ),
  );

  toggleCase() {
    // this.myText.update((text) =>
    //   text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase()
    // );
    this.myText$.next(
      this.myText$.value === this.myText$.value.toUpperCase()
        ? this.myText$.value.toLowerCase()
        : this.myText$.value.toUpperCase(),
    );
  }

  randomizeMyNumber() {
    // this.myNumber.set(Math.floor(Math.random() * 1000));
    this.myNumber$.next(Math.floor(Math.random() * 1000));
  }

  doubleMyNumber() {
    // this.myNumber.update((myNumber) => myNumber * 2);
    this.myNumber$.next(this.myNumber$.value * 2);
  }

  printComputedValuesToConsole() {
    // console.log("myComputedNumber", this.myComputedNumber());
    // console.log("myComputedText", this.myComputedText());

    this.myComputedNumber$.pipe(take(1), untilDestroyed(this)).subscribe(
      (computedNumber) => {
        console.log("myComputedNumber$", computedNumber);
      },
    );
    this.myComputedText$.pipe(take(1), untilDestroyed(this)).subscribe(
      (myComputedText) => {
        console.log("myComputedText$", myComputedText);
      },
    );
  }
}
*/











// .asReadonly(), .asObservable()
/*
export class MyService {
  // private _myValue$ = new BehaviorSubject(1000);
  private _myValue = signal(1000);

  // myValue$ = this._myValue$.asObservable(); // myService.myValue$ | async või myService.myValue$.subscribe((v) => ...);
  myValue = this._myValue.asReadonly(); // myService.myValue();

  setValue(newValue: number) {
    // this._myValue$.next(1000);
    this._myValue.set(newValue);
  }
}
*/
