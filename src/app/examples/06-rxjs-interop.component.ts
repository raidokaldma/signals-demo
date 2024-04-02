import { AsyncPipe } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, input } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

@Component({
  standalone: true,
  imports: [HttpClientModule, AsyncPipe],
  template: `
    <h1>RxJS interop</h1>
<pre>
randomNumber: {{ randomNumber() }}
negativeRandomNumber$: {{ negativeRandomNumber$ | async }}
</pre>
    `,
})
export class RxjsInteropComponent {
  constructor(private http: HttpClient) { }

  // Observable -> signal
  randomNumber = toSignal(
    // Päring tagastab Observable<string>
    this.http.get<number>(
      "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain",
      { responseType: "json" },
    ),
    { initialValue: 0 },
  );

  // signal -> Observable
  negativeRandomNumber$ = toObservable(this.randomNumber).pipe(
    map((num) => -num),
  );
}

// Automaatne unsubscribe
