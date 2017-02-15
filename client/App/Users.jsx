import React from 'react';
import { findDOMNode } from 'react-dom'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';




const usersIcon = <FontIcon className="material-icons">person</FontIcon>;
const groupIcon = <FontIcon className="material-icons">group</FontIcon>;
const PlusButton = <FontIcon className="material-icons">person_add</FontIcon>;


const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorFirstName: null,
            errorLastName: null,
            users: [],
            categories: {},
            allUsers: [],
            selectedIndex: 0,
            selectedCategory: null,
            userFirstName: '',
            userLastName: '',
            openBar: false,
            message: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.usersSorted = this.usersSorted.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.easySort = this.easySort.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancelSaving = this.cancelSaving.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentDidMount() {
        this.getUsers(0, 30);
    };

    //Получение пользователей
    getUsers(){
        $.ajax({
            type: 'GET',
            url: '/api/users' + '?skip=' + arguments[0] + '&limit=' + arguments[1],
            data: '',
            dataType: 'json',
            success: function(resp) {
                if(resp.data.length < 100){
                    this.setState({
                        users: resp.data
                    });
                    this.getUsers(30);
                }
                else{
                    this.setState((prevState) => ({
                        users: prevState.users.concat(resp.data)
                    }));
                    this.fillCategories();
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    //Управление сортировкой
    easySort(val){
        if(!this.state.selectedIndex) {
            this.setState((prevState, props) => ({
                users: this.usersSorted(prevState.users, prevState.categories, val)
            }));
        }
        else{
            this.setState((prevState, props) => ({
                categories: this.usersSorted(prevState.users, prevState.categories, val)
            }));
        }
    }

    //Заполняем категории для удобства хранения
    fillCategories(){
        var categoryUsers = {};
        //я использую map, чтобы распихать по категориям за 1 цикл
        this.state.users.forEach( user => {
            if(categoryUsers[user.category]) categoryUsers[user.category].push(user);
            else{
                categoryUsers[user.category] = [];
                categoryUsers[user.category].push(user);
            }
        });
        this.setState({ categories: categoryUsers })
    }

    // Простая сортировка по полям
    // Для ускорения сортировки можно будет добавить индексы
    // к каждому сортируемому свойству и сортировать по индексам
    usersSorted(users, categories, key){
        if(!this.state.selectedIndex){
            users.sort((a, b) =>{
                if(a[key] && b[key])
                return (a[key].localeCompare(b[key]));
            });
            return users;
        }
        else{
            Object.keys(categories).map(k => {
                categories[k].sort((a, b) =>{
                    if(a[key] && b[key])
                    return (a[key].localeCompare(b[key]));
                });
            });
            return categories;
        }
    }

    changeCategory(event, index, value){
        this.setState({
            selectedCategory: value
        })
    }

    changeFirstName(event){
        this.setState({
            errorFirstName: null,
            userFirstName: event.target.value
        })
    }

    changeLastName(event){
        this.setState({
            errorLastName: null,
            userLastName: event.target.value
        })
    }

    cancelSaving(){
        this.setState({
            selectedIndex: 0
        })
    }

    saveUser(){
        if(!this.state.userFirstName) {
            this.setState({
                errorFirstName: 'Имя не заполнено!'
            });
            return;
        }
        if(!this.state.userLastName) {
            this.setState({
                errorLastName: 'Фамилия не заполнена!'
            });
            return;
        }
        let user = {
                firstName: this.state.userFirstName,
                lastName: this.state.userLastName,
                category: this.state.selectedCategory
        };
        $.ajax({
            type: 'POST',
            url: '/api/users',
            data: user,
            dataType: 'json',
            success: function(resp) {
                this.setState({
                    selectedIndex: 0,
                    openBar: true,
                    message: 'Пользователь успешно добавлен!',
                    userFirstName: '',
                    userLastName: '',
                    selectedCategory: null
                });
                this.getUsers(0, 30);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    select = (index) => {
        let elem = document.getElementsByClassName('sort-button-group');
        if(index == 2) {
            this.setState({
                selectedIndex: index,
                open: true
            });
        }
        else{
            this.setState({ selectedIndex: index });
        }

    };

    handleRequestClose(){
        this.setState({
            openBar: false,
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Сохранить"
                primary={true}
                onTouchTap={ this.saveUser }
            />,
            <FlatButton
                label="Отмена"
                secondary={true}
                onTouchTap={ this.cancelSaving }
            />,
        ];

        return (
            <div className="container">
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Списком"
                        icon={ usersIcon }
                        onTouchTap={() => this.select(0)}/>
                    <BottomNavigationItem
                        label="По группам"
                        icon={ groupIcon }
                        onTouchTap={() => this.select(1)}/>
                    <BottomNavigationItem
                        label="Добавить"
                        icon={ PlusButton }
                        onTouchTap={ () => this.select(2) }/>
                </BottomNavigation>

                <Snackbar
                    open={ this.state.openBar }
                    message={ this.state.message }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

                <Dialog
                    bodyClassName="modal-add-modal"
                    title="Добавление пользователя"
                    actions={ actions }
                    modal={ true }
                    open={ this.state.selectedIndex == 2 }
                    onRequestClose={ this.cancelSaving }>

                    <form className="add-user-form">
                        <div className="form-control">
                            <TextField
                                className="form-control-input"
                                errorText={ this.state.errorFirstName }
                                value={ this.state.userFirstName }
                                onChange={ this.changeFirstName }
                                floatingLabelText="Имя"
                            />
                        </div>
                        <div className="form-control">
                            <TextField
                                className="form-control-input"
                                errorText={ this.state.errorLastName }
                                value={ this.state.userLastName }
                                onChange={ this.changeLastName }
                                floatingLabelText="Фамилия"
                            />
                        </div>
                        <div className="form-control">
                            <SelectField
                                className="form-control-input"
                                floatingLabelText="Группа"
                                value={ this.state.selectedCategory }
                                onChange={ this.changeCategory }>
                                {
                                    Object.keys(this.state.categories).map( k => {
                                        return (
                                            <MenuItem key={ k } value={ k } primaryText={ k } />
                                        )
                                    })
                                }
                            </SelectField>
                        </div>
                        <br/>
                    </form>

                </Dialog>
                <div className="sort-button-group">
                    <FlatButton label="По имени" onClick={ () => this.easySort('firstName') }/>
                    <FlatButton label="По фамилии" onClick={ () => this.easySort('lastName') }/>
                    <FlatButton label="По группе" onClick={ () => this.easySort('category') }/>
                </div>
                <UsersTable userLastName={ this.state.userLastName }
                            userFirstName={ this.state.userFirstName }
                            users={ this.state.users }
                            categories={ this.state.categories }
                            selectedCategory={ this.state.selectedCategory }
                            selectedIndex={ this.state.selectedIndex }
                />
            </div>
        )

    }
}

export default Users;


//Компонент таблицы пользователей, может быть пустой или в виде двух разных таблиц
function UsersTable(props){
    if(props.users){
        if(props.selectedIndex == 1){
            return (
                <CategoriesUsersList
                    users={ props.users }
                    categories={ props.categories } />
            )
        }
        else return (
            <UsersList
                users={ props.users }
                categories={ props.categories } />
        );

    }
    return (
        <div></div>
    )
}

//Компонент простой таблички пользователей
function UsersList(props){
    return (
        <Table
            height={ '300px' }
            fixedHeader={ true }
            fixedFooter={ true }>
            <TableHeader
                displaySelectAll={ false }
                adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Имя</TableHeaderColumn>
                    <TableHeaderColumn>Фамилия</TableHeaderColumn>
                    <TableHeaderColumn>Группа</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false } preScanRows={ false }>
                { props.users.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{index}</TableRowColumn>
                        <TableRowColumn>{row.firstName}</TableRowColumn>
                        <TableRowColumn>{row.lastName}</TableRowColumn>
                        <TableRowColumn>{row.category}</TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

//Компонент группированных по категориям пользователей
function CategoriesUsersList(props){
    return (
        <Table
            height={ '300px' }
            fixedHeader={ true }
            fixedFooter={ true }>
            <TableHeader
                displaySelectAll={ false }
                adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Имя</TableHeaderColumn>
                    <TableHeaderColumn>Фамилия</TableHeaderColumn>
                    <TableHeaderColumn>Группа</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false } preScanRows={ false }>
                {
                    Object.keys(props.categories).map( k => {
                        return props.categories[k].map((row, index) => {
                                return (
                                    <TableRow key={ k + index }>
                                        <TableRowColumn>{ k + index }</TableRowColumn>
                                        <TableRowColumn>{ row.firstName }</TableRowColumn>
                                        <TableRowColumn>{ row.lastName }</TableRowColumn>
                                        <TableRowColumn>{ row.category }</TableRowColumn>
                                    </TableRow>
                                )
                            }
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}