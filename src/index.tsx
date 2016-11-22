import * as React from 'react';
import { render } from 'react-dom';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Components
import { Hello } from './components/Hello';
import { NewButton } from './components/Button';

// Styles
import './index.scss';

function App(): JSX.Element {
    return (
        <div>
            <Hello compiler="TypeScript" framework="React" />
            <NewButton />
        </div>
    );
}

const root: HTMLElement | null = document.getElementById('root');
if (root !== null) {
    render(
        <App />,
        root
    );    
} else {
    console.error('missing root element');
}