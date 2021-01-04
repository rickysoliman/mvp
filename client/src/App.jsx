import React from 'react';
import QuizMenu from './components/QuizMenu.jsx';
import styled from 'styled-components';
import axios from 'axios';
import NoteNamesQuiz from './components/NoteNamesQuiz.jsx';
import ChordsQuiz from './components/ChordsQuiz.jsx';
import IntervalsQuiz from './components/IntervalsQuiz.jsx';

const OuterView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-family: Tahoma;
    color: black;
    position: absolute;
    text-align: center;
    bottom: 70%;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
`;

const Label = styled.label`
    font-family: Arial;
    color: white;
    padding: 20px;
`;

const Input = styled.input`
    margin: auto;
    width: 80%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    &:hover {
        border-color: blue;
        background-color: light-gray;
    }
`;

const Button = styled.button`
    border-radius: 10px;
    background-color: light-gray;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
`;

const Div = styled.div`
    font-family: Arial;
    color: white;
    margin-top: 10px;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

const LoginForm = styled.form`
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 27%;
    overflow: auto;

    text-align: center;
    background-color: #ABB6C8;
    border-radius: 15px;
    width: 30em;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const RegistrationForm = styled.form`
    display: inline-block;
    position: absolute;
    // left: 0;
    // right: 0;
    // top: 0;
    // bottom: 0;
    margin: 3em;
    max-width: auto%;
    max-height: auto;
    overflow: auto;

    text-align: center;
    background-color: #ABB6C8;
    border-radius: 15px;
    width: 30em;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const SmallButton = styled.div`
    text-align: center;
    vertical-align: middle;
    margin: auto;
    font-family: Arial;
    color: white;
    z-index: 2;
    margin: 2em;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            newUser: false,
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            passwordOne: '',
            passwordTwo: '',
            password: '',
            user: '',
            user_id: '',
            noteNames: false,
            chords: false,
            intervals: false
        }

        this.renderNoteNames = this.renderNoteNames.bind(this);
        this.renderChords = this.renderChords.bind(this);
        this.renderIntervals = this.renderIntervals.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this); 
        this.renderRegistrationForm = this.renderRegistrationForm.bind(this);
        this.renderLoginForm = this.renderLoginForm.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateDoublePasswords = this.validateDoublePasswords.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        if (this.props) {
            this.setState({
                loggedIn: this.props.loggedIn,
                user: this.props.user,
                noteNames: false,
                chords: false,
                intervals: false,
                renderFunctions: {
                    noteNames: this.renderNoteNames,
                    chords: this.renderChords,
                    intervals: this.renderIntervals
                }
            });
        } else {
            this.setState({
                noteNames: false,
                chords: false,
                intervals: false,
                renderFunctions: {
                    noteNames: this.renderNoteNames,
                    chords: this.renderChords,
                    intervals: this.renderIntervals
                }
            });
        }
    }

    renderNoteNames(e) {
        this.setState({
            noteNames: true,
            chords: false,
            intervals: false
        });
    }

    renderChords(e) {
        this.setState({
            chords: true,
            noteNames: false,
            intervals: false
        });
    }

    renderIntervals(e) {
        this.setState({
            intervals: true,
            noteNames: false,
            chords: false
        });
    }

    // updates state for all input fields
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // logs in the user
    handleLogin(e) {
        e.preventDefault();
        if ((this.state.username === '') || (this.state.password === '')) {
            alert('Please enter a username and password.');
        } else {
            axios.get('/api/users')
            .then(res => {
                var data = res.data;
                for (let i = 0; i < data.length; i++) {
                    var current = data[i];
                    if (current.username === this.state.username) {
                        if (current.password === this.state.password) {
                            this.setState({
                                loggedIn: true,
                                user: current.firstname,
                                user_id: current.user_id
                            });
                            break;
                        } else {
                            alert('Incorrect password');
                            break;
                        }
                    }
                }
                if (!this.state.loggedIn) {
                    alert('This user does not exist. Please register an account.');
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    // renders registration form for new user
    renderRegistrationForm() {
        this.setState({
            newUser: true
        });
    }

    renderLoginForm() {
        this.setState({
            newUser: false
        });
    }
    
    // validates that the email address is in proper format
    validateEmail(email) {
        return (email.includes('@') && email.includes('.'));
    }

    // make sure both passwords match
    validateDoublePasswords(a, b) {
        return a === b;
    }

    // submits registration for new user
    submitRegistration(e) {
        e.preventDefault();
        if (this.validateEmail(this.state.email) && this.validateDoublePasswords(this.state.passwordOne, this.state.passwordTwo)) {
            axios.post('/api/users', {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                username: this.state.username,
                password: this.state.passwordOne
            })
                .then(res => {
                    this.setState({
                        user: this.state.firstname,
                        loggedIn: true
                    });
                    res.end();
                })
                .catch(err => {
                    console.log('error posting data to database');
                    console.log(err.stack);
                });
        } else {
            if (!this.validateEmail(this.state.email)) {
                alert('Please enter a valid email address');
            } else if (!this.validateDoublePasswords(this.state.passwordOne, this.state.passwordTwo)) {
                alert('Passwords do not match.');
            }
        }
    }

    // log out
    logOut() {
        this.setState({
            loggedIn: false,
            newUser: false
        });
    }

    render() {
        // user is logged in
        if (this.state.loggedIn) {
            // note names quiz
            if (this.state.noteNames) {
                return <NoteNamesQuiz renderFunctions={this.state.renderFunctions} user={this.state.user}/>
            // chords quiz
            } else if (this.state.chords) {
                return <ChordsQuiz renderFunctions={this.state.renderFunctions} user={this.state.user}/>
            // intervals quiz
            } else if (this.state.intervals) {
                return <IntervalsQuiz renderFunctions={this.state.renderFunctions} user={this.state.user}/>
            // quiz menu
            } else {
                return <QuizMenu renderFunctions={this.state.renderFunctions} user={this.state.user} logOut={this.logOut}/>
            }
        // user is not logged in
        } else {
            // login page
            if (!this.state.newUser) {
                return (
                    <OuterView>
                        <Title>
                            Welcome to Music Theory Professor!
                        </Title>
                        <LoginForm>
                            <Label for="username">username</Label><br/>
                            <Input onChange={this.handleChange} type="text" id="username" name="username"/><br/>

                            <Label for="password">password</Label><br/>
                            <Input onChange={this.handleChange} type="password" id="password" name="password"/><br/>

                            <Button onClick={this.handleLogin}>Login</Button><br/>
                            <Div onClick={this.renderRegistrationForm}>Register</Div>
                        </LoginForm>
                    </OuterView>
                )
            // registration page
            } else {
                return (
                    <OuterView>
                        <RegistrationForm>
                            <Label for="firstName">First Name</Label><br/>
                            <Input onChange={this.handleChange} type="text" id="firstname" name="firstName"/><br/>
                            <Label for="lastName">Last Name</Label><br/>
                            <Input onChange={this.handleChange} type="lastName" id="lastname" name="lastName"/><br/>
                            <Label for="email">Email</Label><br/>
                            <Input onChange={this.handleChange} type="email" id="email" name="email"/><br/>
                            <Label for="username">Username</Label><br/>
                            <Input onChange={this.handleChange} type="username" id="username" name="username"/><br/>
                            <Label for="passwordOne">Password</Label><br/>
                            <Input onChange={this.handleChange} type="password" id="passwordOne" name="passwordOne"/><br/>
                            <Label for="passwordTwo">Re-enter Password</Label><br/>
                            <Input onChange={this.handleChange} type="password" id="passwordTwo" name="passwordTwo"/><br/>
                            <Button onClick={this.submitRegistration}>Register</Button>
                            <SmallButton onClick={this.renderLoginForm}>Already have an account? Click here to Log In</SmallButton>
                        </RegistrationForm>
                    </OuterView>
                )
            }
        }
    }
}

export default App;