import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils'
import { connect } from 'react-redux';
class DropdownCity extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            arrCity: [],
            citySelect: ''
        };
    }
    async componentDidMount() {



        this.props.getCityStart();
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.citiesRedux != this.props.citiesRedux) {
            this.setState({
                arrCity: this.props.citiesRedux
            })
        }


    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeValue = (e) => {
        this.setState({
            citySelect: e.currentTarget.textContent
        })

        this.props.selectedCity(e.currentTarget.textContent)
    }
    render() {
        let cities = this.state.arrCity;
        let { citySelect } = this.state;

        return (

            <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                size='lg'
            >
                <DropdownToggle
                    caret
                    className='bg-dropdown-toggle'>
                    <i className="fas fa-map-marker-alt"></i>
                    {citySelect ? citySelect : <FormattedMessage id="header.city" />}


                </DropdownToggle>

                <DropdownMenu className='dropdown-menu-edit'>
                    {cities && cities.length > 0 && cities.map((item, index) => {
                        return (
                            <DropdownItem>
                                <div onClick={this.changeValue}>{item.name}</div>

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
        citiesRedux: state.admin.cities,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCityStart: () => dispatch(actions.fetchCitiesStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCity);