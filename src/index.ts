// Cycle
import { Stream } from 'xstream';
import { run } from '@cycle/xstream-run';
import { div,/* h2,*/ makeDOMDriver } from '@cycle/dom';

// Semantic CSS
import 'semantic-ui-css/semantic.css';

// Components
//import Header from './Header';
import Button from './Button';

// TypeScript Typings
import { DOMSource } from '@cycle/dom/xstream-typings';

interface Sources {
  readonly DOM: DOMSource;
}

function main(sources: Sources) {

//  const header = Header({
//    DOM: sources.DOM,
//    props: [
//      {
//        id: 0,
//        type: 'button',
//        text: 'Home',
//        active: true,
//      },
//      {
//        id: 1,
//        type: 'button',
//        text: 'Import',
//      },
//    ],
//  }); 

  // Finally, the emitted DOM Streams (for differing inputs) for weight and height sliders
//  const vdom$ = Stream.combine(bmi$, weightSlider.DOM, heightSlider.DOM)
//    .map(([bmi, weightVDom, heightVDom]) => 
//      div([
//        weightVDom,
//        heightVDom,
//        h2(`BMI is ${bmi}`),
//      ]),
//    );

  const button = Button({
    DOM: sources.DOM,
    props: { text: 'Home' },
  });

  const button2 = Button({
    DOM: sources.DOM,
    props: { text: 'Import' },
  });

  const vdom$ = Stream.combine(button.DOM, button2.DOM)
    .map(([buttonVDom, button2VDom]) =>
      div([
        buttonVDom,
        button2VDom,
      ]),
    );

  const message$ = button.click$
    .map(() => 'click')
    .drop(1);

  return {
    DOM: vdom$,
    log: message$,
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
  log: (msg$: Stream<string>) => { msg$.addListener({next: msg => console.log(msg)}) },
});
