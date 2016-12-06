import React from 'react';
import { render } from 'react-dom';

import 'semantic-ui-css/semantic.css';

// Components
import Hello from './components/Hello';
import Button from './components/Button';

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept();

function App() {
    return (
        <div>
            <Hello compiler="Babel" framework="React" />
            <Button text="YOOOOOOO" />
        </div>
    );
}

render(
    <App />,
    document.getElementById('root'), // eslint-disable-line no-undef
);