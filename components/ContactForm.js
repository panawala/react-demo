/**
 * A contact form with certain optional fields.
 */

import React from 'react';

var STATES = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

var trim = function() {
    var TRIM_RE = /^\s+|\s+$/g;
    return function trim(string) {
        return string.replace(TRIM_RE, '');
    }
}();

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

class ContactForm extends React.Component{

    static defaultProps = {
        email: true,
        question: false
    };

    constructor(props, context) {
        super(props, context);
        this.state = {errors: {}};
    }

    isValid() {
        var fields = ['firstName', 'lastName', 'phoneNumber', 'address', 'city', 'state', 'zipCode']
        if (this.props.email) fields.push('email');
        if (this.props.question) fields.push('question');

        var errors = {};
        fields.forEach(function(field) {
            var value = trim(this.refs[field].value);
            if (!value) {
                errors[field] = 'This field is required'
            }
        }.bind(this));
        this.setState({errors: errors});

        var isValid = true;
        for (var error in errors) {
            isValid = false;
            break;
        }
        return isValid;
    }

    getFormData() {
        var data = {
            firstName: this.refs.firstName.value
            , lastName: this.refs.lastName.value
            , phoneNumber: this.refs.phoneNumber.value
            , address: this.refs.address.value
            , city: this.refs.city.value
            , state: this.refs.state.value
            , zipCode: this.refs.zipCode.value
            , currentCustomer: this.refs.currentCustomerYes.checked
        };
        if (this.props.email) data.email = this.refs.email.value;
        if (this.props.question) data.question = this.refs.question.value;
        return data
    }

    render() {
        return <div className="form-horizontal">
            {this.renderTextInput('firstName', 'First Name')}
            {this.renderTextInput('lastName', 'Last Name')}
            {this.renderTextInput('phoneNumber', 'Phone number')}
            {this.props.email && this.renderTextInput('email', 'Email')}
            {this.props.question && this.renderTextarea('question', 'Question')}
            {this.renderTextInput('address', 'Address')}
            {this.renderTextInput('city', 'City')}
            {this.renderSelect('state', 'State', STATES)}
            {this.renderTextInput('zipCode', 'Zip Code')}
            {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', {
                values: ['Yes', 'No']
                , defaultCheckedValue: 'No'
            })}
        </div>
    }

    renderTextInput(id, label) {
        return this.renderField(id, label,
            <input type="text" className="form-control" id={id} ref={id}/>
        )
    }

    renderTextarea(id, label) {
        return this.renderField(id, label,
            <textarea className="form-control" id={id} ref={id}/>
        )
    }

    renderSelect(id, label, values) {
        var options = values.map(function(value) {
            return <option key={value} value={value}>{value}</option>
        });
        return this.renderField(id, label,
            <select className="form-control" id={id} ref={id}>
                {options}
            </select>
        )
    }

    renderRadioInlines(id, label, kwargs) {
        var radios = kwargs.values.map(function(value) {
            var defaultChecked = (value == kwargs.defaultCheckedValue);
            return <label key={value} className="radio-inline">
                <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
                {value}
            </label>
        });
        return this.renderField(id, label, radios)
    }

    renderField(id, label, field) {
        return (
            <div className={$c('form-group', {'has-error': id in this.state.errors})}>
                <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
                <div className="col-sm-6">
                    {field}
                </div>
            </div>
        )
    }
}

export default ContactForm