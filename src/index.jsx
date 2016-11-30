import React from 'react';
import { render } from 'react-dom';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

import 'semantic-ui-css/semantic.css';
import './main.scss';

// Components
import Hello from './components/Hello';
import NewButton from './components/Button';

// Styles
// import './main.css';

function App() {
    return (
        <div>
            <Hello />
            <NewButton />
        </div>
    );
}

render(
    <App />,
    document.getElementById('root'), // eslint-disable-line no-undef
);