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

  // Initialize the Components
  const weightSlider = LabeledSlider({ 
    DOM: sources.DOM,
    props$: Stream.of({
      label: 'Weight',
      unit: 'kg',
      min: 40,
      value: 70,
      max: 150,
    }), 
  });
  const heightSlider = LabeledSlider({ 
    DOM: sources.DOM, 
    props$: Stream.of({
      label: 'Height',
      unit: 'cm',
      min: 140,
      value: 170,
      max: 210,
    }), 
  });

  // Calculate the bmi based on weight and height slider values
  const bmi$ = Stream.combine(weightSlider.value$, heightSlider.value$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return bmi;
    })
    .remember();

  const vdom$ = Stream.combine(bmi$, weightSlider.DOM, heightSlider.DOM)
    .map(([bmi, weightVDom, heightVDom]) => 
      div([
        weightVDom,
        heightVDom,
        h2(`BMI is ${bmi}`)
      ])
    );

  return {
    DOM: vdom$
  };
}

run(main, {
  DOM: makeDOMDriver('#app')
});
