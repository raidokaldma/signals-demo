import { Component, effect, input, model, signal } from "@angular/core";

@Component({
  selector: "component-with-model",
  standalone: true,
  template: `
<button (click)="updateMyValue()">Update value</button>
  `,
})
export class ComponentWithModel {
  myValue = model();

  updateMyValue() {
    this.myValue.set(Math.floor(Math.random() * 100));
  }
}

@Component({
  standalone: true,
  imports: [ComponentWithModel],
  template: `
    <h1>Model (Two Way Binding, banana-in-the-box, [()] syntax)</h1>
<pre>
myValue: {{ myValue }}
myValueAsSignal: {{ myValueAsSignal() }}
</pre>
<!-- Sisse võib anda nii tavalise väärtuse kui ka signali -->
<component-with-model [(myValue)]="myValue" />
<component-with-model [(myValue)]="myValueAsSignal" />
    `,
})
export class ModelExampleComponent {
  myValue = 100;
  myValueAsSignal = signal(100)
}
