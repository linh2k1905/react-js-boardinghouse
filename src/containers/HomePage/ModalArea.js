import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from '@mui/material/Slider';
import './../HomePage/HomeHeader.scss'
const MIN_VALUE = 0;
const MAX_VALUE = 100;
const marks = [
    {
        value: 1,
        label: '1m2',
    },
    {
        value: 10,
        label: '10m2',
    },
    {
        value: 20,
        label: '20m2',
    },
    {
        value: 30,
        label: '30m2',
    },
    {
        value: 40,
        label: '40m2',
    },
    {
        value: 50,
        label: '50m2',
    },

];
class ModalArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            value: ''

        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggleModalArea()
    }
    handleOnchangeArea = (event) => {
        this.setState({
            value: event.target.value
        })
        this.props.selectArea(this.state.value);


    }



    render() {
        return (
            <Modal
                centered={true}
                size={'lg'}
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Chọn diện tích</ModalHeader>
                <ModalBody>
                    <Slider
                        size="small"
                        defaultValue={null}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={50}
                        onChange={(event) => this.handleOnchangeArea(event)}
                    />

                </ModalBody>
                <ModalFooter>
                    <button onClick={this.toggle}>OK</button>
                </ModalFooter>
            </Modal>

        );
    }
}

export default ModalArea;