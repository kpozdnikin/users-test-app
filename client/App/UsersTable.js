'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('material-ui/Table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersTable = function (_React$Component) {
    _inherits(UsersTable, _React$Component);

    function UsersTable(props) {
        _classCallCheck(this, UsersTable);

        var _this = _possibleConstructorReturn(this, (UsersTable.__proto__ || Object.getPrototypeOf(UsersTable)).call(this, props));

        _this.state = {
            users: _this.props.users
        };
        console.log(_this.state.users);
        _this.componentDidMount = _this.componentDidMount.bind(_this);
        return _this;
    }

    _createClass(UsersTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return null
            /*<Table
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
                <TableBody displayRowCheckbox={ false }>
                    { this.state.users.map( (row, index) => (
                        <TableRow key={index} selected={row.selected}>
                            <TableRowColumn>{index}</TableRowColumn>
                            <TableRowColumn>{row.firstName}</TableRowColumn>
                            <TableRowColumn>{row.lastName}</TableRowColumn>
                            <TableRowColumn>{row.category}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>*/
            ;
        }
    }]);

    return UsersTable;
}(_react2.default.Component);

exports.default = UsersTable;

//# sourceMappingURL=UsersTable.js.map