import React from 'react';

import ContactForm from './ContactForm.js'

class Example extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: true
            , question: true
            , submitted: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        var submitted;
        if (this.state.submitted !== null) {
            submitted = <div className="alert alert-success">
                <p>ContactForm data:</p>
                <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
            </div>
        }

        return <div>
            <div className="panel panel-default">
                <div className="panel-heading clearfix">
                    <h3 className="panel-title pull-left">Contact Form</h3>
                    <div className="pull-right">
                        <label className="checkbox-inline">
                            <input type="checkbox"
                                   checked={this.state.email}
                                   onChange={this.handleChange.bind(this, 'email')}
                                /> Email
                        </label>
                        <label className="checkbox-inline">
                            <input type="checkbox"
                                   checked={this.state.question}
                                   onChange={this.handleChange.bind(this, 'question')}
                                /> Question
                        </label>
                    </div>
                </div>
                <div className="panel-body">
                    <ContactForm ref="contactForm"
                                 email={this.state.email}
                                 question={this.state.question}
                                 company={this.props.company}
                        />
                </div>
                <div className="panel-footer">
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
            {submitted}
        </div>
    }

    handleChange(field, e) {
        var nextState = {};
        nextState[field] = e.target.checked;
        this.setState(nextState)
    }

    handleSubmit() {
        console.log('submit');
        console.log(this.refs.contactForm.getFormData());
        if (this.refs.contactForm.isValid()) {
            this.setState({submitted: this.refs.contactForm.getFormData()})
        }
    }
}

class Calendar extends React.Component {

    render() {

        return (
            <div>
                <h2>Calendar</h2>
                <Example company="FakeCo"/>
            </div>
        )
    }
}

export default Calendar
