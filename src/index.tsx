import * as React from 'react';
import { render } from 'react-dom';

import { Hello } from './components/Hello';

import './index.scss';

const element: HTMLElement | null = document.getElementById('root');
if (element !== null) {
    render(
        <Hello compiler="TypeScript" framework="React" />,
        element
    );
} else {
    console.error('missing root element');
}