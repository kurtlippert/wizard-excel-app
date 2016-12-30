//// Cycle
//import { div, span, input, VNode } from '@cycle/dom';
//
//// Components
//import Button from './Button';
//
//// TypeScript Typings
//import { DOMSource } from '@cycle/dom/xstream-typings';
//
//// Sources: input
//interface Sources {
//  readonly DOM: DOMSource;
//  readonly props: Props;
//}
//
//// Sinks: output
//interface Sinks {
//  readonly DOM: MemoryStream<VNode>;
//}
//
//function Header(sources: Sources): Sinks {
//
//  // Intent
//  // No Intent
//
//  // Model
//  // No Model
//  
//  // View
//  const vdom$ = state$
//    .map(state => 
//      div('.labeled-slider', [
//        span('.label',
//          `${state.label} ${state.value} ${state.unit}`
//        ),
//        input('.slider', {
//          attrs: { type: 'range', min: state.min, max: state.max, value: state.value }
//        }),
//      ]),
//    );
//
//  // Return the sinks
//  // NOTE: need the value stream to calculate bmi
//  return {
//    DOM: vdom$,
//  };
//}
//
//// Want to isolate components so that duplicate DOM selects (i.e. '.select('weight')')
//// don't conflict with one another. Returning another function that calls our
//// (isolated) component, resolves this issue
//export default (sources: Sources) =>
//    isolate(LabeledSlider)(sources)