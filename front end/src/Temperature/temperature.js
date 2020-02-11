import React, { Component } from 'react';

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celciusTemperature: "",
            FarenheightTemperature: ""
        }
        this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
    }

    handleTemperatureChange(event) {
        var value = event.target.value ? event.target.value : "";
        var prefix = value === "-" ? "-" : "";
        if (isNaN(parseFloat(value)) && value !== "-") {
            this.setState({
                celciusTemperature: "",
                FarenheightTemperature: ""
            })
            if (value !== "" || value === "-") {
                alert("ENter a NUmber");
            }
        } else {
            if(value.indexOf(".") === value.length - 1){
                event.target.name === "celcius" ? (this.setState({
                    celciusTemperature: value,
                })) : (this.setState({
                    inputType: "F",
                    FarenheightTemperature: value,
                }));
                return
            }
            if (prefix !== "-") {
                event.target.name === "celcius" ? (this.setState({
                    celciusTemperature: parseFloat(prefix + value),
                    FarenheightTemperature: (parseFloat(prefix + value) * 9 / 5) + 32
                })) : (this.setState({
                    FarenheightTemperature: parseFloat(prefix + value),
                    celciusTemperature: (parseFloat(prefix + value) - 32) * 5 / 9
                }));
            } else {
                event.target.name === "celcius" ? (this.setState({
                    celciusTemperature: value,
                })) : (this.setState({
                    FarenheightTemperature: value,
                }));
            }

        }
    }



    render() {
        return <div className="container">
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="">
                    <b>Temperature:</b></div>
                <div className="col-lg-1"></div>
                <div className="">
                    <input type="text" name="celcius" placeholder="Celsius" value={this.state.celciusTemperature} onChange={this.handleTemperatureChange} />
                </div>
                <div className="col-lg-1"></div>
                <div>
                    {/* <button style={arrowBtn}> */}
                    <span style={{ fontSize: '22px' }}>&#8646;</span>
                    {/* </button>    */}
                </div>
                <div className="col-lg-1"></div>
                <div className="">
                    <input type="text" name="farenheight" placeholder="Farenheight" value={this.state.FarenheightTemperature} onChange={this.handleTemperatureChange} />
                </div>
            </div>
        </div>;
    }
}

export default Temperature;