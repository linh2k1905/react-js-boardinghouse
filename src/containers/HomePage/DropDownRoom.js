import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
export default class DropdownRoom extends React.Component {
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
                    <i className="fas fa-warehouse"></i>
                    <FormattedMessage id="header.type" />
                </DropdownToggle>

                <DropdownMenu
                    className='dropdown-menu-edit'>

                    <DropdownItem className=''>Chung cư</DropdownItem>
                    <DropdownItem >Phòng trọ</DropdownItem>
                    <DropdownItem>Nhà trọ</DropdownItem>
                    <DropdownItem />
                    <DropdownItem>Căn hộ</DropdownItem>
                </DropdownMenu>
            </Dropdown>

        );
    }
}