// Cycle
import { Stream, MemoryStream } from 'xstream';
import { div, span, input, makeDOMDriver, VNode } from '@cycle/dom';
import isolate from '@cycle/isolate';

// TypeScript Typings
import { DOMSource } from '@cycle/dom/xstream-typings';

// Sources: input
interface Sources {
  readonly DOM: DOMSource;
  readonly props$: Stream<Props>;
}

// Sinks: output
// NOTE: although these properties are both MemoryStreams, they could be regular streams.
// It's just that in our case, we needed to use the 'flatten()' and/or 'remember()' methods
// which create this new 'MemoryStream' data structure
interface Sinks {
  readonly DOM: MemoryStream<VNode>;
  readonly value$: MemoryStream<number>;
}

// Props: input
interface Props {
  readonly label: string;
  readonly unit: string;
  readonly min: number;
  readonly value: number;
  readonly max: number;
}

function LabeledSlider(sources: Sources): Sinks {
  const newValue$ = sources.DOM
    .select('.slider')
    .events('input')
    .map(ev => parseInt((ev.target as HTMLInputElement).value));

  // for each Prop object in the property stream...
  // map each Prop object...
  // to a new Prop object with the index of a newValue (in the newValue stream)...
  // mapped to the same index of the Prop Object in the property stream
  //
  // newValue Stream - newValue$ (the slider the user manipulates):
  // ---7---8---9---10---9---8
  // 
  // property Stream - props$ (the property object):
  // {...}
  //
  // Not much of a stream, but it's mainly there to map to the newValue Stream
  // {orig, value: 70}---{...orig, value: 7 }---{...orig, value: 8 }---...
  // ^^^^^^^^^^^^^^^^^
  //    Start With
  //
  // 
  const state$ = sources.props$
    .map(props => newValue$
      .map(val => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        value: val,
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state => 
      div('.labeled-slider', [
        span('.label',
          `${state.label} ${state.value} ${state.unit}`
        ),
        input('.slider', {
          attrs: { type: 'range', min: state.min, max: state.max, value: state.value }
        })
      ])
    );

  const sinks = {
    DOM: vdom$,
    value$: state$.map(state => state.value),
  };
 
  return sinks;
}

// Want to isolate components so that duplicate DOM selects (i.e. '.select('weight')')
// don't conflict with one another
export default (sources: Sources) =>
    isolate(LabeledSlider)(sources)