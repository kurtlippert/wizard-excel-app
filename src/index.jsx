import React from 'react';
import { render } from 'react-dom';

import 'semantic-ui-css/semantic.css';

// Components
import Hello from './components/Hello';
import NewButton from './components/Button';

function App() {
    return (
        <div>
            <Hello compiler="Babel" framework="React" />
            <NewButton />
        </div>
    );
}

render(
    <App />,
    document.getElementById('root'), // eslint-disable-line no-undef
);