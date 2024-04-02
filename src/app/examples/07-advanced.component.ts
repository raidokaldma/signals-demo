import { AsyncPipe } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  Component,
  effect,
  HostListener,
  inject,
  Injector,
  OnInit,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { of, switchMap } from "rxjs";

@Component({
  standalone: true,
  template: `
  `,
})
export class AdvancedComponent { }

// signal(), effect() ja asünkroonsus

// @Component({
//   standalone: true,
//   template: `
//   `,
// })
// export class AdvancedComponent implements OnInit {
//   myValue = signal(0);
//   myOtherValue = signal(0);
//
//   // Mitu korda effect() käivitub ja mida kirjutatakse konsooli?
//   myEffect = effect(() => {
//     console.count("effect()");
//     console.log("myValue is", this.myValue(), "myOtherValue is", this.myOtherValue());
//   });
//
//   ngOnInit(): void {
//     this.myValue.set(1);
//     this.myOtherValue.set(1);
//
//     this.myValue.set(2);
//     this.myOtherValue.set(2);
//
//     setTimeout(() => {
//       this.myValue.set(3);
//       this.myOtherValue.set(3);
//     });
//
//     setTimeout(() => {
//       this.myValue.set(3);
//       this.myOtherValue.set(3);
//     });
//
//     setTimeout(() => {
//       this.myValue.update((v) => v + 1);
//       this.myOtherValue.update((v) => v + 1);
//     });
//   }
// }










// effect() + if

// @Component({
//   standalone: true,
//   template: `
//   `,
// })
// export class AdvancedComponent implements OnInit {
//   showMyValue = signal(false);
//   myValue = signal(0);
//
//   // Mitu korda effect() käivitub ja mida kirjutatakse konsooli?
//   myEffect = effect(() => {
//     console.count("effect()");
//
//     if (this.showMyValue()) {
//       console.log("My value is", this.myValue());
//     } else {
//       console.log("Inside effect, but not showing value");
//     }
//   });
//
//   ngOnInit(): void {
//     setTimeout(() => {
//       this.myValue.set(1);
//     });
//     setTimeout(() => {
//       this.myValue.set(2);
//     });
//     setTimeout(() => {
//       this.myValue.set(3);
//     });
//     setTimeout(() => {
//       this.myValue.set(4);
//       this.showMyValue.set(true);
//     });
//     setTimeout(() => {
//       this.myValue.set(5);
//     });
//   }
// }










// injection context

// @Component({
//   standalone: true,
//   template: `
//   `,
// })
// export class AdvancedComponent implements OnInit {
//   myValue = signal(0);
//
//   // OK
//   myEffect = effect(() => {
//     console.log("myValue is", this.myValue());
//   });
//
//   // OK
//   constructor() {
//     effect(() => {
//       console.log("myValue is", this.myValue());
//     });
//   }
//
//   ngOnInit(): void {
//     // NOK
//     // Error: NG0203: effect() can only be used within an injection context such as a constructor,
//     // a factory function, a field initializer, or a function used with `runInInjectionContext`
//     effect(() => {
//       console.log("myValue is", this.myValue());
//     });
//   }
//
//   // constructor(private injector: Injector)
//   // või
//   // injector = inject(Injector);
//   //
//   // ngOnInit(): void {
//   //   effect(() => {
//   //     console.log("myValue is", this.myValue());
//   //   }, { injector: this.injector });
//   // }
// }










// effect() sees signal väärtuse muutmine

// @Component({
//   standalone: true,
//   template: `
// <pre>
// myValue: {{ myValue() }}
// myOtherValue: {{ myOtherValue() }}
// </pre>
//   `,
// })
// export class AdvancedComponent implements OnInit {
//   myValue = signal(0);
//   myOtherValue = signal(0);
//
//   myEffect = effect(() => {
//     // Viga
//     this.myOtherValue.set(this.myValue());
//   });
//   // }, { allowSignalWrites: true }); // Footgun
//
//   ngOnInit(): void {
//     this.myValue.set(1000);
//     setTimeout(() => {
//       this.myValue.set(2000);
//     }, 2000);
//   }
// }





// signal vs observable ohukohad, seda tuleks demoda Chrome'is, mitte Safaris

// @Component({
//   standalone: true,
//   imports: [HttpClientModule, AsyncPipe],
//   template: `
// <pre>
// randomNumber: {{ randomNumber() }}
// randomNumber: {{ randomNumber() }}
// randomNumber: {{ randomNumber() }}
// vs
// randomNumber$: {{ randomNumber$ | async }}
// randomNumber$: {{ randomNumber$ | async }}
// randomNumber$: {{ randomNumber$ | async }}
// </pre>
//   `,
// })
// export class AdvancedComponent {
//   constructor(private http: HttpClient) {}
//
//   randomNumber = toSignal(
//     this.http.get<string>(
//       "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain",
//     ),
//   );
//   randomNumber$ = this.http.get<string>(
//     "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain",
//   );
// }
//
// toSignal ja veahaldus
// @Component({
//   standalone: true,
//   imports: [HttpClientModule],
//   template: `
// <pre>
// myValue: {{ myValue() }}
// </pre>
//   `,
// })
// export class AdvancedComponent {
//   constructor(private http: HttpClient) {}
//
//   // Kui päring annab vea, siis järgmine change detection käivitab päringu uuesti!
//   myValue = toSignal(this.http.get<string>("https://poleolemas/"));
//   // { rejectErrors: true }
//
//   @HostListener("window:mousemove")
//   doNothing() {
//     // @HostListener käivitab lihtsalt palju kordi change detection'it
//   }
// }










// effect() + onCleanup()

// @Component({
//   standalone: true,
//   template: `
// <pre>
// myValue: {{ lastUpdate().toISOString() }}
// </pre>
// <button (click)="extendTime()">Uuenda aega</button>
//   `,
// })
// export class AdvancedComponent {
//   lastUpdate = signal<Date>(new Date());
//
//   constructor() {
//     effect((onCleanup) => {
//       const lastActive = this.lastUpdate();
//
//       const timer = setTimeout(() => {
//         console.log("5 sek on möödas, sind võiks välja logida. Viimati aktiivne:", lastActive);
//       }, 5000);
//
//       onCleanup(() => {
//         clearTimeout(timer);
//       });
//     });
//   }
//
//   extendTime() {
//     this.lastUpdate.set(new Date());
//   }
// }










// JavaScript Signals standard proposal
// https://github.com/tc39/proposal-signals?tab=readme-ov-file#-javascript-signals-standard-proposal
