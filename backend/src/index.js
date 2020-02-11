const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'),
    jwt = require('express-jwt'),
    jwksRSA = require('jwks-rsa');

const app = express();



/**
 * APIs for token generation
 * 
 */

const checkJWT = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-4sfcte3m.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: `mfaFKVlkjJtR9J7Apkycqz7I32mM1kWv`,
    issuer: `https://dev-4sfcte3m.eu.auth0.com`,
    algorithms: ['RS256']
});

//##############################################################

//APIs foe provisionsing

//##############################################################
const questions = [{
    id: 1,
    title: 'What is React?',
    description: 'I have been hearing a lot about React. What is it?',
    answers: [
        { answer: 'React is amazing. I love it.', author: 'Alex' },
        { answer: 'React is a framwork created by Facebook written in Javascript.', author: 'Rahul' },
        { answer: 'React is a useless framework nothing in comapred to angular or VueJS.', author: 'Shobhit' }]
},
{
    id: 2,
    title: 'How do I make a sandwich?',
    description: 'I am trying very hard, but I do not know how to make a delicious sandwich. Can someone help me?',
    answers: []
}];


// const questions = [];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

/**
 * Return all questions in the database
 */
app.get('/', (req, res) => {
    const qs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers
    }));
    res.send(qs);
});


/**
 * Authenticate the user with username and password and generate a JWT session
 */

app.post('/authenticate', (req, res) => {


});

/**
 * Get a specific question based on id
 */
app.get('/:id', (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    console.log(question.length)
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
});


/**
 * Insert a new answer to a question
 */
app.post('/answer/:id', checkJWT, (req, res) => {
    const { answer } = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer,
        author: req.user.name
    });
    res.status(200).send();
});


/** 
 * insert a new question
*/
app.post('/', checkJWT, (req, res) => {
    const { title, description } = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
        author: req.user.name
    };
    questions.push(newQuestion);
    res.status(200).send();
});

// start the server
app.listen(8012, () => {
    console.log('listening on port 8012');
});