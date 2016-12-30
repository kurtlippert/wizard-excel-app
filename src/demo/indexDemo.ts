// Cycle
import { Stream } from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, h2, makeDOMDriver } from '@cycle/dom';

// Components
import LabeledSlider from './LabeledSlider';

// TypeScript Typings
import { DOMSource } from '@cycle/dom/xstream-typings';

interface Sources {
  readonly DOM: DOMSource;
}

function main(sources: Sources) {

  // Initialize the Components w/ their props
  // NOTE: Labeled Sliders emit a value stream (what the user specifies on slider),
  // and a stream of VNodes (new state of the dom)
  const weightSlider = LabeledSlider({ 
    DOM: sources.DOM,
    props: {
      label: 'Weight',
      unit: 'kg',
      min: 40,
      value: 70,
      max: 150,
    }, 
  });
  const heightSlider = LabeledSlider({ 
    DOM: sources.DOM, 
    props: {
      label: 'Height',
      unit: 'cm',
      min: 140,
      value: 170,
      max: 210,
    }, 
  });

  // Calculate the bmi based on weight and height slider values
  // NOTE: .combine remembers most recent event automatically
  // So that means that the slider value changed, then it was combined, 
  // but that first change isn't forgotten
  const bmi$ = Stream.combine(weightSlider.value$, heightSlider.value$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return bmi;
    });

  // Finally, the emitted DOM Streams (for differing inputs) for weight and height sliders
  const vdom$ = Stream.combine(bmi$, weightSlider.DOM, heightSlider.DOM)
    .map(([bmi, weightVDom, heightVDom]) => 
      div([
        weightVDom,
        heightVDom,
        h2(`BMI is ${bmi}`),
      ]),
    );

  return {
    DOM: vdom$,
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
