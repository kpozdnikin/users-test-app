import React from 'react';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
moment.locale("ru");

const style = {
};

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  (
            <MuiThemeProvider>
                <Paper style={style} zDepth={1} className="container">
                    <h1>Таблица пользователей</h1>
                    {this.props.children}
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;