import { Component, ContentChild, ElementRef, ViewChild, contentChild, input, viewChild } from "@angular/core";

@Component({
  selector: 'my-child',
  standalone: true,
  template: `
    <div #myDiv>This is my DIV</div>

    Here is my content from parent component:
    <ng-content></ng-content>
  `
})
export class MyChildComponent {
  @ViewChild("myDiv") myDiv!: ElementRef;
  @ContentChild("contentFromParent") contentFromParent!: ElementRef;

  ngAfterViewInit() {
    // Mul on nüüd ligipääs DIV elemendile
    console.log('myDiv', this.myDiv.nativeElement);

    // Mul on nüüd ligipääs väljaspoolt sisse antud elemendile
    console.log('contentFromParent', this.contentFromParent.nativeElement);
  }
}

@Component({
  standalone: true,
  imports: [MyChildComponent],
  template: `
    <h1>View Queries</h1>
    <my-child>
      <div #contentFromParent>Text from parent</div>
    </my-child>
    `,
})
export class ViewQueriesExampleComponent {
}






















// viewChild(), contentChild()
/*
@Component({
  selector: 'my-child',
  standalone: true,
  template: `
    <div #myDiv>This is my DIV</div>

    Here is my content from parent component:
    <ng-content></ng-content>
  `
})
export class MyChildComponent {
  // @ViewChild("myDiv") myDiv!: ElementRef;
  myDiv = viewChild.required<ElementRef>('myDiv'); // Selgitan ka .required() vajadust

  // @ContentChild("contentFromParent") contentFromParent!: ElementRef;
  contentFromParent = contentChild.required<ElementRef>('contentFromParent');

  ngAfterViewInit() {
    // Mul on nüüd ligipääs DIV elemendile
    // console.log('myDiv', this.myDiv.nativeElement);
    console.log('myDiv', this.myDiv().nativeElement);

    // Mul on nüüd ligipääs väljaspoolt sisse antud elemendile
    // console.log('contentFromParent', this.contentFromParent.nativeElement);
    console.log('contentFromParent', this.contentFromParent().nativeElement);
  }
}
*/
