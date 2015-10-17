import React from 'react'

var forms = require('newforms');

var SignupForm = forms.Form.extend({
    username: forms.CharField(),
    email: forms.EmailField(),
    password: forms.CharField({widget: forms.PasswordInput}),
    confirmPassword: forms.CharField({widget: forms.PasswordInput}),
    acceptTerms: forms.BooleanField({required: true}),
    clean: function () {
        if (this.cleanedData.password &&
            this.cleanedData.confirmPassword &&
            this.cleanedData.password != this.cleanedData.confirmPassword) {
            throw forms.ValidationError('Passwords do not match.')
        }
    }
});


class Signup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <forms.RenderForm form={SignupForm} clean={this.clean} ref="signupForm"/>
                <button>Sign Up</button>
            </form>
        )
    }

    onSubmit(e) {
        e.preventDefault();

        var form = this.refs.signupForm.getForm();
        var isValid = form.validate();
        if (isValid) {
            this.props.onSignup(form.cleanedData);
        }
    }

}

Signup.propTypes = {
    onSignup: React.PropTypes.func.isRequired
};


class Grades extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(data) {
        console.log(data);
    }

    render() {
        return (
            <div>
                <h2>Grades</h2>
                <Signup onSignup={ this.handleSignup }/>
            </div>
        )
    }

}

export default Grades
