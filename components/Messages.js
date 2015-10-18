import React from 'react'
import forms from 'newforms'

Object.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};

var STATES = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

var BootstrapRadioInlineRenderer = forms.RadioFieldRenderer.extend({
    render() {
        return this.choiceInputs().map(input => (
            <label className="radio-inline">
                {input.tag()} {input.choiceLabel}
            </label>
        ))
    }
});

var ContactForm = forms.Form.extend({
    firstName: forms.CharField({maxLength: 50}),
    lastName: forms.CharField({maxLength: 50}),
    phoneNumber: forms.RegexField(/^[-\d]*$/, {
        errorMessages: {invalid: 'Invalid characters in phone number'}
    }),
    email: forms.EmailField(),
    question: forms.CharField({widget: forms.Textarea({attrs: {rows: 3}})}),
    address: forms.CharField({widget: forms.Textarea({attrs: {rows: 3}})}),
    city: forms.CharField({maxLength: 50}),
    state: forms.ChoiceField({choices: STATES}),
    zipCode: forms.RegexField(/^\d{5}(?:-?\d{4})?$/, {
        errorMessages: {invalid: 'Must be 5 digts or 5+4 digits'}
    }),
    currentCustomer: forms.ChoiceField({
        choices: [['Y', 'Yes'], ['N', 'No']]
        , initial: 'N'
        , widget: forms.RadioSelect({renderer: BootstrapRadioInlineRenderer})
    }),

    constructor(kwargs) {
        kwargs = Object.extend({email: false, question: false}, kwargs);
        ContactForm.__super__.constructor.call(this, kwargs);
        this.fields.currentCustomer.label = 'Are you currently a ' + kwargs.company + ' Customer?'
        if (!kwargs.email) {
            delete this.fields.email
        }
        if (!kwargs.question) {
            delete this.fields.question
        }
    },

    cleanPhoneNumber() {
        var phoneNumber = this.cleanedData.phoneNumber.replace(/-/g, '');
        if (phoneNumber.length < 10) {
            throw forms.ValidationError('Must contain at least 10 digits')
        }
        return phoneNumber
    },

    render() {
        return this.visibleFields().map(this.renderField.bind(this))
    },

    renderField(bf) {
        var errors = bf.errors();
        var hasErrors = errors.isPopulated();
        var fieldCassName = $c({'form-control': bf.name !== 'currentCustomer'});
        return (
            <div key={bf.htmlName} className={$c('form-group', {'has-error': hasErrors})}>
                {bf.labelTag({attrs: {className: "col-sm-4 control-label"}})}
                <div className="col-sm-4">
                    {bf.render({attrs: {className: fieldCassName}})}
                </div>
                <div className="col-sm-4 help-text">
                    <p className="form-control-static">
                        {hasErrors && errors.messages()[0]}
                    </p>
                </div>
            </div>
        )
    }
});


/**
 * A contact form with certain optional fields.
 */
class ContactFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: new ContactForm(this.getFormKwargs(this.props))
        };
        this.getFormKwargs = this.getFormKwargs.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    getFormKwargs(props, extraKwargs) {
        return Object.extend({
            validation: {on: 'change blur', delay: 500}
            , onChange: this.forceUpdate.bind(this)
            , company: props.company
            , email: props.email
            , question: props.question
        }, extraKwargs)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.email !== this.props.email ||
            nextProps.question !== this.props.question) {
            var formKwargs = this.getFormKwargs(nextProps, {
                data: (this.state.form.isBound ? this.state.form.data : null)
                , errors: this.state.form.errors()
            });
            var form = new ContactForm(formKwargs);
            this.setState({form: form})
        }
    }

    _onSubmit(e) {
        e.preventDefault();
        var isValid = this.state.form.validate(this.refs.form);
        console.log(isValid);
        this.props.onSubmit(isValid ? this.state.form.cleanedData : null);
        this.forceUpdate()
    }

    render() {
        return (
            <form ref="form" onSubmit={this._onSubmit}>
                <div className="panel-body">
                    <div className="form-horizontal">
                        {this.state.form.render()}
                    </div>
                </div>
                <div className="panel-footer">
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        )
    }
}

ContactFormComponent.defaultProps = {
    email: true,
    question: false
};


// Utils
function $c(staticClassName, conditionalClassNames) {
    var classNames = [];
    if (typeof conditionalClassNames == 'undefined') {
        conditionalClassNames = staticClassName
    }
    else {
        classNames.push(staticClassName)
    }
    for (var className in conditionalClassNames) {
        if (!!conditionalClassNames[className]) {
            classNames.push(className)
        }
    }
    return classNames.join(' ')
}


class Messages extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: true,
            question: true,
            submitted: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field, e) {
        var nextState = {};
        nextState[field] = e.target.checked;
        this.setState(nextState)
    }

    handleSubmit(data) {
        console.log(data);
        this.setState({submitted: data});
    }

    render() {
        var submitted;
        if (this.state.submitted !== null) {
            submitted = <div className="alert alert-success">
                <p>ContactForm data:</p>
                <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
            </div>
        }

        return (
            <div>
                <h2>Messages</h2>

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
                    <ContactFormComponent ref="contactForm"
                                          email={this.state.email}
                                          question={this.state.question}
                                          company={this.props.company}
                                          onSubmit={this.handleSubmit}
                        />
                </div>
                {submitted}
            </div>
        )
    }
}

Messages.defaultProps = {
    company: "FakeCo"
};

export default Messages
