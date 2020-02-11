import React, { Component } from 'react';
import axios from 'axios';
import Answers from './Answers/answers';


class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: null
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const question = (await axios.get(`http://localhost:8012/${params.questionId}`)).data;
        this.setState({ question, });
    }

    render() {
        const { question } = this.state;
        if (question === null) return <p>Loading ...</p>;
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-3">{question.title}</h1>
                        <p className="lead">{question.description} </p>
                        <hr className="my-4" />

                        <div className="d-inline">Answers:</div>
                        { question.answers.length !== 0 && <div className="d-inline float-right"> written by</div>}
                        {
                            question.answers.map(
                                (answer, idx) => (
                                    <p className="lead" key={idx}>
                                        <span className="float-right font-italic">{answer.author} </span>
                                        {answer.answer}
                                    </p>
                                ))
                        }
                        <div className="mt-5">
                        { question.answers.length === 0 && <p className=""> Be the first to answer</p>}
                        { question.answers.length !== 0 && <p className=""> Add your Own:</p>}
                        <Answers id={question.id}></Answers>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;