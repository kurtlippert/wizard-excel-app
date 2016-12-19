import { Stream } from 'xstream';
import { div, label, input, hr, h1, makeDOMDriver, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { run } from '@cycle/xstream-run';

interface ISources {
  DOM: DOMSource;
}

interface ISinks {
  DOM: Stream<VNode>;
}

function main(sources: ISources): ISinks {
  const inputEv$ = sources.DOM.select('.field').events('input');
  const name$ = inputEv$
    .map(ev => (ev.target as HTMLInputElement).value)
    .startWith('');
  return {
    DOM: name$.map(name =>
      div([
        label('Name:'),
        input('.field', { attrs: { type: 'text' } }),
        h1(`Hello ${name}!`)
      ])      
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);