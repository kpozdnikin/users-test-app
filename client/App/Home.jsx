import React from 'react';
import FlatButton from 'material-ui/FlatButton';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.enterTheApp = this.enterTheApp.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    enterTheApp(){
        location.href='/users';
    }

    render() {
        return (
            <div>
                <h2>Добро пожаловать в тестовое приложение!</h2>
                <FlatButton
                    label="Войти"
                    primary={true}
                    onTouchTap={ this.enterTheApp }
                />
            </div>
        )
    }
}

export default Home;