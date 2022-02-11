import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };

        return (

            <div className='Section-section section-about'>


                <span className='title-section-about'>Xem thêm thông tin về website qua video</span>

                <div className='content-about'>
                    <div className='content-left'>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/vZfhsHVzrcg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <Form>
                            <FormGroup >
                                <Label for="exampleEmail" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" placeholder="Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Label for="exampleEmail" sm={2}>Tel</Label>
                                <Col sm={10}>
                                    <Input type="tel" name="tel" placeholder="Tel" />
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Label for="examplePassword" sm={2}>Góp ý</Label>
                                <Col sm={10}>
                                    <Input type="textarea"

                                        name="support" placeholder=" Góp ý/Support" />
                                </Col>
                            </FormGroup>
                            <button className='btn-contact'>Gửi</button>
                        </Form>

                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languaguage: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
