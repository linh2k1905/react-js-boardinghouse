import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './HomeHeader.scss'
export default class DropdownPrice extends React.Component {
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
                    <i className="fas fa-money-bill-wave-alt"></i>
                    Giá phòng
                </DropdownToggle>

                <DropdownMenu
                    className='dropdown-menu-edit'>

                    <DropdownItem >1 triệu - 2 triệu</DropdownItem>
                    <DropdownItem >2 triệu - 4 triệu</DropdownItem>
                    <DropdownItem>4 triệu - 8 triệu</DropdownItem>

                    <DropdownItem>Trên 8 triệu</DropdownItem>
                </DropdownMenu>
            </Dropdown>

        );
    }
}