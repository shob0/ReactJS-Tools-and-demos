import React, { Component } from 'react';
// import axios from 'axios';

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: null,
            errorMessage: null,
            successMessage: null
        };
    }


    handleAnswerChange = (e) => {
        let answer = e.target.value;
        this.setState({
            answer: answer,
        });

    }

    handleSubmit = () => {
        let questionId = this.props.id;
        console.log('ID of the displayed question: ', questionId)
        if (!this.state.answer) {
            this.setState({ errorMessage: `Can't submit empty Response.` });
            return;
        }
        else {
            // Call API to store the answer in the backend
            // axios.post('https://localhost:8012/answer/' + questionId, {body})
            // Display success message
            this.setState({ errorMessage: null });
            this.setState({ successMessage: 'Answer Submitted successfully. It will be displayed after validation is done by Admins.' });
            setInterval(()=> {
                this.setState({ successMessage: null });
            }, 10000);
        }
    }



    render() {
        return (
            <div className="container">
                <div>
                    <textarea name="answer" onChange={this.handleAnswerChange} className="w-100" style={{ height: '5em' }}>
                    </textarea>
                </div>
                <div>
                    <button className="btn btn-sm btn-primary float-right" onClick={this.handleSubmit}>Submit</button>
                </div>
                {this.state.errorMessage && <div className="invalid-feedback d-inline">{this.state.errorMessage}</div>}
                {this.state.successMessage && <div className="valid-feedback d-inline">{this.state.successMessage}</div>}
            </div>
        )
    }
}

export default Answer;
