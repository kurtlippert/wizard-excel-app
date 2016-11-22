import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12
};

export class NewButton extends React.Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider>
                <RaisedButton label="Click Me" style={style} />
            </MuiThemeProvider>
        );
    }
}