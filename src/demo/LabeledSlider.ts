// Cycle
import { Stream, MemoryStream } from 'xstream';
import { div, span, input, VNode } from '@cycle/dom';
import isolate from '@cycle/isolate';

// TypeScript Typings
import { DOMSource } from '@cycle/dom/xstream-typings';

// Sources: input
interface Sources {
  readonly DOM: DOMSource;
  readonly props: Props;
}

// Sinks: output
// NOTE: although these properties are both MemoryStreams, they could be regular streams.
// It's just that in our case, we needed to use the 'remember()' method
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

  // Intent
  const newValue$ = sources.DOM
    .select('.slider')
    .events('input')
    .map(ev => parseInt((ev.target as HTMLInputElement).value));

  // Model
  // The state of the slider at each input.
  // Basically, we want to create a new stream with each item in the stream
  // as a Prop object with the updated value.
  // We had to make the 'props' a stream in order to do this.
  // Flatten the stream of streams so we only get back 1 stream
  // Remember just keeps the most recently emitted event in memory.
  // Without remember, the sliders don't render (maybe something to do with .startWith??)
  const state$ = Stream.of(sources.props)
    .map(props => newValue$
      .map(val => ({ ...props, value: val }))
      .startWith(props)
    )
    .flatten()
    .remember();
  
  // View
  const vdom$ = state$
    .map(state => 
      div('.labeled-slider', [
        span('.label',
          `${state.label} ${state.value} ${state.unit}`
        ),
        input('.slider', {
          attrs: { type: 'range', min: state.min, max: state.max, value: state.value }
        }),
      ]),
    );

  // Return the sinks
  // NOTE: need the value stream to calculate bmi
  return {
    DOM: vdom$,
    value$: state$.map(state => state.value),
  };
}

// Want to isolate components so that duplicate DOM selects (i.e. '.select('weight')')
// don't conflict with one another. Returning another function that calls our
// (isolated) component, resolves this issue
export default (sources: Sources) =>
    isolate(LabeledSlider)(sources)