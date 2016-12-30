// Cycle
import { Stream } from 'xstream';
import { button, VNode } from '@cycle/dom';
import isolate from '@cycle/isolate';

// TypeScript Typings
import { DOMSource } from '@cycle/dom/xstream-typings';

// Sources: input
interface Sources {
  readonly DOM: DOMSource;
  readonly props: Props;
}

// Sinks: output
interface Sinks {
  readonly DOM: Stream<VNode>;
  readonly click$: Stream<boolean>; 
}

// Props: input
interface Props {
  readonly text: string;
  readonly active?: boolean;
}

function Button(sources: Sources): Sinks {

  // Intent
  const click$ = sources.DOM
    .select('.button')
    .events('click')
    .map(() => true);

  // Model
  const state$ = Stream.of(sources.props)
    .map(props => click$
      .map(click => ({ ...props, active: click }))
      .startWith({ ...props, active: props.active ? props.active : false })  
    )
    .flatten()
    .remember();

  // View
  const vdom$ = state$
    .map(state =>
      button('.ui .button', `${state.text}`),
    );

  // Return the Sinks
  return {
    DOM: vdom$,
    click$: state$.map(state => state.active),
  };
}

export default (sources: Sources) =>
  isolate(Button)(sources)