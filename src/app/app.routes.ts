import { Routes } from "@angular/router";
import { BasicsComponent } from "./examples/01-basics.component";
import { InputsExampleComponent } from "./examples/02-inputs.component";
import { OutputsExampleComponent } from "./examples/03-outputs.component";
import { ModelExampleComponent } from "./examples/04-two-way-binding-model.component";
import { ViewQueriesExampleComponent } from "./examples/05-view-queries.component";
import { RxjsInteropComponent } from "./examples/06-rxjs-interop.component";
import { AdvancedComponent } from "./examples/07-advanced.component";

export const routes: Routes = [
  { path: "basics", component: BasicsComponent },
  { path: "inputs", component: InputsExampleComponent },
  { path: "outputs", component: OutputsExampleComponent },
  { path: "model", component: ModelExampleComponent },
  { path: "view-queries", component: ViewQueriesExampleComponent },
  { path: "rxjs", component: RxjsInteropComponent },
  { path: "advanced", component: AdvancedComponent },
];
