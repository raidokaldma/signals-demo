import { JsonPipe } from "@angular/common";
import {
  Component,
  computed,
  Input,
  input,
  numberAttribute,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "my-child",
  standalone: true,
  imports: [JsonPipe],
  template: `
<pre>
myRequiredString: {{ myRequiredString }}

myNumber: {{ myNumber }}

myObject: {{ myObject | json }}

myModifiedObject: {{ myModifiedObject | json }}
</pre>
  `,
})
export class MyChildComponent implements OnChanges {
  @Input() myObject = { name: "" };
  @Input({ required: true }) myRequiredString!: string; // !, sest TypeScript ei tea, et väärtus on alati olemas
  @Input({ transform: numberAttribute }) myNumber = 0;

  myModifiedObject = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes["myObject"]) {
      this.myModifiedObject = {
        ...this.myObject,
        hasName: !!this.myObject.name,
      };
    }
  }
}

@Component({
  standalone: true,
  template: `
    <h1>&#64;Input vs input()</h1>
    <my-child 
      [myObject]="myObject"
      myRequiredString="Bar"
      myNumber="100"
    />
    <button (click)="changeMyObject()">Change my object</button>
  `,
  imports: [MyChildComponent],
})
export class InputsExampleComponent {
  myObject = { name: "" };

  changeMyObject() {
    this.myObject = Math.random() > 0.5 ? { name: "" } : { name: "A name" };
  }
}























// input()
/*
@Component({
  selector: "my-child",
  standalone: true,
  imports: [JsonPipe],
  template: `
<pre>
myRequiredString: {{ myRequiredString() }}

myNumber: {{ myNumber() }}

myObject: {{ myObject() | json }}

myModifiedObject: {{ myModifiedObject() | json }}
</pre>
  `,
})
export class MyChildComponent {
  // @Input() myObject = { name: "" };
  myObject = input({ name: "" });

  // @Input({ required: true }) myRequiredString!: string;
  myRequiredString = input.required<string>();

  // @Input({ transform: numberAttribute }) myNumber = 0;
  myNumber = input(0, { transform: numberAttribute });

  myModifiedObject = computed(() => {
    return { ...this.myObject(), hasName: !!this.myObject().name };
  });

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["myObject"]) {
  //     this.myModifiedObject = {
  //       ...this.myObject,
  //       hasName: !!this.myObject.name,
  //     };
  //   }
  // }
}
*/























// Olemasolevate konvertimine
// ng g ngxtension:convert-signal-inputs
// https://ngxtension.netlify.app/utilities/migrations/signal-inputs-migration/
