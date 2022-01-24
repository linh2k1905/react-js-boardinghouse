import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
export default class DropdownCity extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
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
                    <FormattedMessage id="header.city" />

                </DropdownToggle>

                <DropdownMenu
                    className='dropdown-menu-edit'>

                    <DropdownItem >Hồ Chí Minh</DropdownItem>
                    <DropdownItem >Cần Thơ</DropdownItem>
                    <DropdownItem>Sóc Trăng</DropdownItem>
                    <DropdownItem />
                    <DropdownItem>Bạc Liêu</DropdownItem>
                </DropdownMenu>
            </Dropdown>

        );
    }
}