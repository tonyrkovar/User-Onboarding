import React from 'react';
import {withFormik, Field, Form} from 'formik';
import * as Yup from 'yup';

const Onboarding = ({values}) => {
    return (
        <div className='form-container'>
            <Form>
                <label className='input-field'>
                    Username: 
                <Field  type='text' name='username' placeholder='Name'/>
                </label>
                <label className='input-field'>
                    Email: 
                <Field  type='email' name='email' placeholder='Email'/>
                </label>
                <label className='input-field'>
                    Username: 
                <Field  type='text' name='password' placeholder='Password'/>
                </label>
            </Form>
            <p>test</p>
        </div>
    )
};

const FormikOnboarding = withFormik({
    mapPropsToValues({name, email}){
        return {
            name: name || '',
            email: email || ''
        }
    }
})(Onboarding);

export default FormikOnboarding;