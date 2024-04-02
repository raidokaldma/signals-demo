import { Component, EventEmitter, Output, output } from "@angular/core";
import { outputFromObservable } from "@angular/core/rxjs-interop";
import { Subject } from "rxjs";

@Component({
  selector: "component-with-output",
  standalone: true,
  template: `
    <button (click)="emitMyValue()">Emit some value</button>
    `,
})
export class ComponentWithOutput {
  // @Output() myValueChange = new EventEmitter<number>();
  myValueChange = output<number>(); // Uus süntaks, sarnane input()-ile, kuid output on lihtsalt "syntactic sugar" ja ei ole signal()

  emitMyValue() {
    this.myValueChange.emit(Math.floor(Math.random() * 1000));
  }
}

@Component({
  standalone: true,
  imports: [ComponentWithOutput],
  template: `
    <h1>&#64;Output vs output()</h1>

    <component-with-output (myValueChange)="logMyChangedValue($event)" />
    `,
})
export class OutputsExampleComponent {
  logMyChangedValue(value: number) {
    console.log("Got value", value);
  }
}

























// Observable as @output
/*
export class ComponentWithOutput {
  @Output() myValueChange = new Subject<number>(); // 👎 Toimib kogemata

  emitMyValue() {
    this.myValueChange.next(Math.floor(Math.random() * 1000));
  }
}
*/























// outputFromObservable()
/*
export class ComponentWithOutput {
  // @Output() myValueChange = new Subject<number>(); // 👎 Toimib kogemata
  private myValue$ = new Subject<number>();
  myValueChange = outputFromObservable(this.myValue$); // 👍

  emitMyValue() {
    // this.myValueChange.emit(Math.floor(Math.random() * 1000));
    this.myValue$.next(Math.floor(Math.random() * 1000));
  }
}
*/























// ng g ngxtension:convert-outputs
// https://ngxtension.netlify.app/utilities/migrations/new-outputs-migration/
