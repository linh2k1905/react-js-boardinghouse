import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from '@mui/material/Slider';
const MIN_VALUE = 0;
const MAX_VALUE = 100;
const marks = [
    {
        value: 1,
        label: '1M',
    },
    {
        value: 10,
        label: '1OM',
    },
    {
        value: 20,
        label: '20M',
    },
    {
        value: 30,
        label: '30M',
    },
    {
        value: 40,
        label: '40M',
    },
    {
        value: 50,
        label: '50M',
    },

];
class ModalPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            valuePrice: ''
        };


    }

    toggle() {
        this.props.toggleModalPrice()
    }
    handleOnchange = (event) => {

        this.setState({
            valuePrice: event.target.value
        })
        this.props.selectPrice(this.state.valuePrice);


    }



    render() {
        return (

            <Modal
                // centered={true}
                size={'lg'}
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
            >
                <ModalHeader
                    toggle={() => this.toggle()}

                >

                    Chọn giá
                </ModalHeader>
                <ModalBody>
                    <Slider
                        size="small"
                        defaultValue={null}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={50}
                        onChange={(event) => this.handleOnchange(event)}
                    />

                </ModalBody>
                <ModalFooter>
                    <button onClick={() => this.toggle()}>Đã chọn xong</button>
                </ModalFooter>
            </Modal>

        );
    }
}

export default ModalPrice;