




//import { Stream, MemoryStream } from 'xstream';
//import { run } from '@cycle/xstream-run';
//import { div, span, label, input, hr, h1, h2, h4, button, p, a, makeDOMDriver, VNode } from '@cycle/dom';
//import { makeHTTPDriver } from '@cycle/http';
//import isolate from '@cycle/isolate';
//
//import LabeledSlider from './LabeledSlider';
//
//import { DOMSource } from '@cycle/dom/xstream-typings';
//import { HTTPSource } from '@cycle/http/xstream-typings';
//
//interface Sources {
//  readonly DOM: DOMSource;
//  readonly HTTP?: HTTPSource;
//  readonly props$: Stream<Props>;
//}
//
//interface Sinks {
//  readonly DOM: MemoryStream<VNode>;
//  readonly value$: MemoryStream<number>;
//}
//
//interface Intent {
//  readonly changeWeight$: Stream<number>;
//  readonly changeHeight$: Stream<number>;
//} 
//
//interface Model {
//  readonly weight: number,
//  readonly height: number,
//  readonly bmi: number
//}
//
//interface Props {
//  readonly label: string;
//  readonly unit: string;
//  readonly min: number;
//  readonly value: number;
//  readonly max: number;
//}
//
// function main(sources: ISources): ISinks {
//   const inputEv$ = sources.DOM.select('.field').events('input');
//   const name$ = inputEv$
//     .map(ev => (ev.target as HTMLInputElement).value)
//     .startWith('');
//   return {
//     DOM: name$.map(name =>
//       div([
//         label('Name:'),
//         input('.field', { attrs: { type: 'text' } }),
//         h1(`Hello ${name}!`)
//       ])      
//     )
//   }
// }

// function main(sources: ISources): ISinks {
//   const decrementClick$ = sources.DOM
//     .select('.decrement').events('click');
//   const incrementClick$ = sources.DOM
//     .select('.increment').events('click');

//   const decrementAction$ = decrementClick$.map(() => -1);
//   const incrementAction$ = incrementClick$.map(() => +1);

//   const number$ = Stream
//     .merge(decrementAction$, incrementAction$)
//     .fold((acc, x) => acc + x, 10);

//   return {
//     DOM: number$.map(number =>
//       div([
//         button('.decrement', 'Decrement'),
//         button('.increment', 'Increment'),
//         p([
//           label(String(number))
//         ])
//       ])
//     )
//   }
// }

// DOM read effect: button clicked (DOM source)
// HTTP write effect: request sent (HTTP sink)
// HTTP read effect: response received (HTTP source)
// DOM write effect: data display (DOM sink)

// function main(sources: ISources): ISinks {

//   const getFirstUser$ = sources.DOM
//     .select('.get-first')
//     .events('click')
//     .map(() => {
//       return {
//         url: '//jsonplaceholder.typicode.com/users/1',
//         category: 'users',
//         method: 'GET',
//       }
//     });

//   const user$ = sources.HTTP
//     .select('users')
//     .flatten()
//     .map(res => res.body)
//     .startWith(undefined);

//   const vdom$ = user$.map(user =>
//     div([
//       button('.get-first', 'Get first user'),
//       user === undefined ? null : div('.user-details', [          
//         h1('.user-name', (user as IUser).name),
//         h4('.user-email', (user as IUser).email),
//         a('.user-website', { href: (user as IUser).website }, (user as IUser).website),
//       ]),
//     ]),
//   );

//   return {
//     DOM: vdom$,
//     HTTP: getFirstUser$,
//   };
// }

// DOM read effect: detect slider change
// Logic: recalculate BMI
// DOM write effect: display BMI
//
//function intent(source: DOMSource): ICalcs {
//   const changeWeight$ = source 
//    .select('.weight')
//    .events('input')
//    .map(ev => Number.parseInt((ev.target as HTMLInputElement).value));
//    
//  const changeHeight$ = source
//    .select('.height')
//    .events('input')
//    .map(ev => Number.parseInt((ev.target as HTMLInputElement).value)); 
//
//  return { changeWeight$, changeHeight$ };
//}
//
//function model(changeWeight$: Stream<number>, changeHeight$: Stream<number>): Stream<{ weight: number, height: number, bmi: number }> {
//  const weight$ = changeWeight$.startWith(70);
//  const height$ = changeHeight$.startWith(170);
//  
//  const state$ = Stream.combine(weight$, height$)
//    .map(([weight, height]) => {
//      const heightMeters = height * 0.01; 
//      const bmi = Math.round(weight / (heightMeters * heightMeters));
//      return { weight, height, bmi }; 
//    });
//
//  return state$;
//}
//
//function view(state$: Stream<{ weight: number, height: number, bmi: number }>): Stream<VNode> {
//  
//  const vdom$ = state$.map(({ weight, height, bmi }) =>
//    div([
//      div([
//        label('Weight: ' + weight + 'kg'),
//        input('.weight', { attrs: { type: 'range', min: 40, max: 150 } } )
//      ]),
//      div([
//        label('Height: ' + height + 'cm'),
//        input('.height', { attrs: { type: 'range', min: 140, max: 220 } } )
//      ]),
//      h2('BMI is ' + bmi)
//    ])
//  );
//
//  return vdom$;
//}
//
//function main(sources: ISources): ISinks {
//
//  const { changeWeight$, changeHeight$ } = intent(sources.DOM);
//  const state$ = model(changeWeight$, changeHeight$);
//  const vtree$ = view(state$);
//
//  return {
//    DOM: vtree$,
//    // HTTP: ,
//  }
//}
//
//
//function renderWeightSlider(weight: number): VNode {
//  return div([
//    `Weight ${weight}kg`,
//    input('.weight', { attrs: { type: 'range', min: 40, max: 140, value: weight } })
//  ]);
//}
//
//function renderHeightSlider(height: number): VNode {
//  return div([
//    `Height ${height}cm`,
//    input('.height', { attrs: { type: 'range', min: 140, max: 210, value: height } })
//  ]);
//}
//
//function bmi(weight: number, height: number): number {
//  const heightMeters = height * 0.01;
//  return Math.round(weight / (heightMeters * heightMeters));
//}
//
//function intent(domSource: DOMSource): Intent {
//  return {
//    changeWeight$: domSource.select('.weight')
//      .events('input')
//      .map(ev => 
//        parseInt((ev.target as HTMLInputElement).value)
//      ),
//    changeHeight$: domSource.select('.height')
//      .events('input')
//      .map(ev => 
//        parseInt((ev.target as HTMLInputElement).value)
//      )
//  };
//}
//
//function model(actions: Intent): Stream<Model> {
//  const weight$: Stream<number> = actions.changeWeight$.startWith(70);
//  const height$: Stream<number> = actions.changeHeight$.startWith(170);
//
//  return Stream.combine(weight$, height$)
//    .map(([weight, height]) => {
//      return { weight, height, bmi: bmi(weight, height) };
//    });
//}
//
//function view(state$: Stream<Model>): Stream<VNode> {
//  return state$.map(({ weight, height, bmi }) =>
//    div([
//      renderWeightSlider(weight),
//      renderHeightSlider(height),
//      h2(`BMI is ${bmi}`)
//    ])
//  );
//
//
//yyfunction main(sources: Sources) {
//yy//  const props$ = Stream.of({
//yy//    label: 'Radius', unit: '', min: 10, value: 30, max: 100
//yy//  });
//yy//  const childSources = { DOM: sources.DOM, props: props$ };
//yy//  const labeledSlider = LabeledSlider(childSources);
//yy//  const childVDom$ = labeledSlider.DOM;
//yy//  const childValue$ = labeledSlider.value;
//yy//
//yy//  const vdom$ = Stream.combine(childVDom$, childValue$)
//yy//    .map(([childVDom, value]) => 
//yy//      div([
//yy//        childVDom,
//yy//        div({ style: {
//yy//          backgroundColor: '#58D3D8',
//yy//          width: String(2 * value) + 'px',
//yy//          height: String(2 * value) + 'px',
//yy//          borderRadius: String(value) + 'px'
//yy//        }})
//yy//      ])
//yy//    );
//yy//
//yy
//yy  const weightProps$ = Stream.of({
//yy    label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150
//yy  });
//yy  const heightProps$ = Stream.of({
//yy    label: 'Height', unit: 'cm', min: 140, value: 170, max: 210
//yy  });
//yy
//yy  const WeightSlider = isolate(LabeledSlider, 'weight');
//yy  const HeightSlider = isolate(LabeledSlider, 'height');
//yy
//yy  const weightSlider = WeightSlider({ DOM: sources.DOM, props$: weightProps$ });
//yy  const heightSlider = HeightSlider({ DOM: sources.DOM, props: heightProps$ });
//yy
//yy  const bmi$ = Stream.combine(weightSlider.value, heightSlider.value)
//yy    .map(([weight, height]) => {
//yy      const heightMeters = height * 0.01;
//yy      const bmi = Math.round(weight / (heightMeters * heightMeters));
//yy      return bmi;
//yy    })
//yy    .remember();
//yy
//yy  const vdom$ = Stream.combine(bmi$, weightVDom$, heightVDom$)
//yy    .map(([bmi, weightVDom, heightVDom]) => 
//yy      div([
//yy        weightVDom,
//yy        heightVDom,
//yy        h2(`BMI is ${bmi}`)
//yy      ])
//yy    );
//yy
//yy  return {
//yy    DOM: vdom$
//yy  };
//yy  // Wanna select only the dom elements with that '.weight' class
//yy  // NOTE: same for height below
//yy//  const weightSources = {
//yy//    DOM: sources.DOM,
//yy//    props: weightProps$
//yy//  };
//yy//  const heightSources = {
//yy//    DOM: sources.DOM,
//yy//    props: heightProps$
//yy//  };
//yy//
//yy  //
//yy//  // for each VNode in the stream,
//yy//  // append an additional class to it's selector
//yy//  // NOTE: sel is a property that refers to the node's selector
//yy//  const weightVDom$ = weightSlider.DOM;
//yy//  const weightValue$ = weightSlider.value;
//yy//
//yy//  const heightVDom$ = heightSlider.DOM;
//yy//  const heightValue$ = heightSlider.value;
//yy//
//yy
//yy}
//yy
//yyrun(main, {
//yy  DOM: makeDOMDriver('#app')
//yy});
//yy
//yy
//yy//
//yy//function intent(domSource: DOMSource): Stream<any> {
//yy//  return (
//yy//    domSource.select('.slider')
//yy//      .events('input')
//yy//      .map(ev => (ev.target as HTMLInputElement).value)
//yy//  );
//yy//}
//yy//
//yy//function model(newValue$: Stream<any>, props$: Stream<any>) {
//yy//  const initialValue$ = props$.map(props => props.init).take(1);
//yy//  const value$ = initialValue$.
//yy//  return newValue$.startWith(initialValue$);
//yy//}
//yy//
//yy//function view(value$: Stream<any>) {
//yy//  return value$.map(value =>
//yy//    div('.labeled-slider', [
//yy//      label('.label', `Weight: ${value}kg`),
//yy//      input('.slider', { attrs : { type: 'range', min: 40, max: 150, value } } )
//yy//    ])
//yy//  );
//yy//}
//yy//
//yy//function main(sources: ISources): ISinks {
//yy//
//yy//  const change$ = intent(sources.DOM);
//yy//  const value$ = model(change$, sources.props);
//yy//  const vtree$ = view(value$);
//yy//
//yy//  return 
//yy//    DOM: vtree$
//yy//  };
//yy//}
//yy//
//yy//const drivers = {
//yy//  DOM: makeDOMDriver('#app'),
//yy//  props: () => Stream.of({
//yy//    label: 'Height',
//yy//    unit: 'cm',
//yy//    min: 140,
//yy//    max: 220,
//yy//    init: 170
//yy//  })
//yy//}
//yy//
//yy//run(main, drivers);