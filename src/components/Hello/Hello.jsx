import * as React from 'react';

import { blueColor, whiteBackgroundColor } from './Hello.css';

export class Hello extends React.Component {
    render() {
        return (
            <h1 className={`${blueColor} ${whiteBackgroundColor}`}>
                Hello from {this.props.compiler} and {this.props.framework}!
            </h1>
        );
    }
}