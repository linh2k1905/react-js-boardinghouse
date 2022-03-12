import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ModalPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };


    }

    toggle() {
        this.props.toggleModalPost();

    }
    handleOnchange = (event) => {




    }



    render() {
        return (

            <Modal
                centered={true}
                size={'lg'}
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
            >
                <ModalHeader
                    toggle={() => this.toggle()}

                >

                    Thông tin về bài đăng:
                </ModalHeader>
                <ModalBody>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>Đã chọn xong</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>Đóng</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

export default ModalPost;