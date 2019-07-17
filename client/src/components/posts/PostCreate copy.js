import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../../actions';

class PostCreate extends React.Component {

    renderError(meta) {
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {meta.error}
                    </div>
                </div>
            )
        }
    };

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label> {label} </label>
                <input {...input} />
                <div> {this.renderError(meta)} </div>
            </div>
        )
    };

    onSubmit = (formValues) => {
        this.props.createPost(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="body" component={this.renderInput} label="Add Body" />

                <button className="ui button primary">Submit</button>
            </form>
        )
    }
};

const validate = (formValues) => {
    let errors = {};

    if (!formValues.title) {
        errors.title = 'Must provide a Title';
    }
    if (!formValues.body) {
        errors.body = 'Must provide post body';
    }

    return errors;
};


const formWrapped = reduxForm({
    form: 'PostCreate',
    validate: validate,
})(PostCreate);

export default connect(null, {
    createPost,
})(formWrapped);