import React, { PropTypes } from 'react';

import { blueColor, whiteBackgroundColor } from './Hello.scss';

function Hello({ compiler, framework }) {
    return (
        <h1 className={`${blueColor} ${whiteBackgroundColor}`}>
            Hello from {compiler} and {framework}!
        </h1>
    );
}

Hello.propTypes = {
    compiler: PropTypes.string,
    framework: PropTypes.string,
};

Hello.defaultProps = {
    compiler: '',
    framework: '',
};

export default Hello;