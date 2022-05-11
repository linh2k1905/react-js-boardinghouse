import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils'
import { connect } from 'react-redux';
class DropdownRoom extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            arrRoom: [],
            roomSelect: {}
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    async componentDidMount() {



        this.props.getTypeHouseStart();
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.typeHouseRedux != this.props.typeHouseRedux) {
            this.setState({
                arrRoom: this.props.typeHouseRedux
            })
        }


    }
    changeValue = (item) => {
        this.setState({
            roomSelect: item
        })

        this.props.selectedRoom(item);
    }
    render() {
        let rooms = this.state.arrRoom;
        let { languaguage } = this.props;
        let { roomSelect } = this.state;
        return (

            <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                size='lg'
            >
                <DropdownToggle
                    caret
                    className='bg-dropdown-toggle'>
                    <i className="fas fa-warehouse"></i>
                    {roomSelect.nameVi ? roomSelect.nameVi : <FormattedMessage id="header.type" />}

                </DropdownToggle>

                <DropdownMenu
                    className='dropdown-menu-edit'>
                    {rooms && rooms.length > 0 && rooms.map((item, index) => {
                        return (


                            <DropdownItem className=''>
                                <div onClick={() => this.changeValue(item)}>{languaguage === LANGUAGES.EN ? item.name : item.nameVi}</div>
                            </DropdownItem>
                        )
                    })}



                </DropdownMenu>
            </Dropdown>

        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languaguage: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownRoom);