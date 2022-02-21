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
            arrRoom: []
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
    render() {
        let rooms = this.state.arrRoom;
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
                    <FormattedMessage id="header.type" />
                </DropdownToggle>

                <DropdownMenu
                    className='dropdown-menu-edit'>
                    {rooms && rooms.length > 0 && rooms.map((item, index) => {
                        return (


                            <DropdownItem className=''>{LANGUAGES.VI ? item.nameVi : item.name}</DropdownItem>
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