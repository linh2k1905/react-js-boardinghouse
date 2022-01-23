import React, { Component } from "react";
import "./AreaSelect.css";

class AreaSelect extends Component {
    state = {
        value: 0
    }

    decrease = () => {
        this.setState({ value: this.state.value - 2 });
    }

    increase = () => {
        this.setState({ value: this.state.value + 2 });
    }
    handleInput = () => {
        this.setState({
            value: 0
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className='bg-dropdown-toggle'>
                    Diện tích
                    <div className="def-number-input number-input">
                        <button onClick={this.decrease} className="minus"></button>
                        <input className="quantity" name="quantity"
                            value={this.state.value}
                            type="number"
                            onClick={this.handleInput}
                        />
                        <button onClick={this.increase} className="plus"></button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AreaSelect;