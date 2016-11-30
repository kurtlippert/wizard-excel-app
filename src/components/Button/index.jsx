import React from 'react';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';

// import 'semantic-ui-css/semantic.css';

import Button from 'semantic-ui-react/src/elements/Button';

// const style = {
//     margin: 12
// };

// class NewButton extends React.Component {
//     render() {
//         return (
//             // <MuiThemeProvider>
//                 // <RaisedButton label="Click Me" style={style} />
//             // </MuiThemeProvider>

//             <Button>
//                 Click Me
//             </Button>

//         );
//     }
// }

function NewButton() {
    return (
        <Button>
            Click Me
        </Button>
    );
}

export default NewButton;