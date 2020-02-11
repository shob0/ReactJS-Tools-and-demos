import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputString: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyInput = this.handleKeyInput.bind(this);
    }

    handleInput(evt) {
        var operatorArr = ['+', '-', '*', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        var inputval = evt.target.id ? evt.target.id: evt.key;
        if (inputval === "=" || inputval === "Enter") {
            this.CalculateResult();
            return;
        }
        if (inputval === "C" || inputval === "Escape") {
            this.setState({ inputString: "" });
            return;
        }
        if (operatorArr.indexOf(inputval) !== -1) {
            this.setState({ inputString: this.state.inputString + inputval });
        } else {
            alert('Invalid Input');
            return;
        }
    }

    handleKeyInput(evt) {
        var validKeysArr = ['Shift', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'CapsLock', 'Tab', 'Control', 'Meta', 'Alt', 'ContextMenu', 'Control', 'AltGraph', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'End', 'PageDown', 'PageUp', 'Home', 'Delete', 'Insert'];
        console.log(evt.key)
        if(validKeysArr.indexOf(evt.key) === -1) {
            this.handleInput(evt)
        }
    }

    CalculateResult() {
        try {
            this.setState({ inputString: eval(this.state.inputString) });
        } catch (error) {
            this.setState({ inputString: "" });
            alert('Provide valid Input');
        }

    }

    render() {
        return <div style={{ textAlign: "center" }} className="container">
                <h3>Calculator</h3>
                <Container fluid style={{ lineHeight: '40px' }}>
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={3} style={{ backgroundColor: '', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }}>
                            <input type="text" style={{ width: '100%' }} value={this.state.inputString} readOnly onKeyDown={this.handleKeyInput} autoFocus/>
                        </Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="C">C</Col>
                        <Col md={4} ></Col>
                    </Row>
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="7">7</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="8">8</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="9">9</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="+">+</Col>
                        <Col md={4} ></Col>
                    </Row>
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="4">4</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="5">5</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="6">6</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="-">-</Col>
                        <Col md={4} ></Col>
                    </Row>
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="1">1</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="2">2</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="3">3</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="*">&#10005;</Col>
                        <Col md={4} ></Col>
                    </Row>
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id=".">.</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="0">0</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="=">=</Col>
                        <Col md={1} style={{ backgroundColor: '#D0D0D0', border: '0.5px solid black', padding: '8px', borderRadius: '5px' }} className="column" onClick={this.handleInput} id="/">/</Col>
                        <Col md={4} ></Col>
                    </Row>
                </Container>
            </div>
    }
}

export default Calculator;