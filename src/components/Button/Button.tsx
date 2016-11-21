import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style: Object = {
    margin: 12
};

export class NewButton extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <MuiThemeProvider>
                <RaisedButton label="Click Me" style={style} />
            </MuiThemeProvider>
        );
    }
}