import * as React from 'react';

import { helloColor, helloBackgroundColor } from './Hello.scss';

export interface IHelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<IHelloProps, {}> {
    render(): JSX.Element {
        return (
            <h1 className={`${helloColor} ${helloBackgroundColor}`}>
                Hello from {this.props.compiler} and {this.props.framework}!
            </h1>
        );
    }
}