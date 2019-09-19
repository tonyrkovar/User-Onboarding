import React, {useState, useEffect} from 'react';
import {withFormik, Field, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Onboarding = ({values, errors, touched, status}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(status){
            status && setUser([...user, status])
        }
    }, [status])
    return (
        <div className='form-container'>
            <Form >
                <div>
                    Username: 
                <Field  type='text' name='username' placeholder='Name'/>
                {touched.username && errors.username && (<p className='error'>{errors.username}</p>)}
                </div>
                <div>
                    Email: 
                <Field  type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                </div>
                <div>
                    Password: 
                <Field  type='password' name='password' placeholder='Password'/>
                {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
                </div>
                <div>
                    I Have Read and Agree to the Terms of Service: 
                <Field  type='checkbox' name='terms' checked={values.terms} />
                </div>
                <button type='submit'>Submit</button>
            </Form>
            {console.log(user.username)}
            {user.map((userCard, i) => (
                    <div key={i}>
                        <p>Username: {userCard.username}</p>
                        <p>Email: {userCard.email}</p>
                        <p>Password: {userCard.password}</p>
                    </div>
                
            ))}
        </div>
    )
};


const FormikOnboarding = withFormik({
    mapPropsToValues({username, email, password, terms}){
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(2).required('Username Must Be Atleast 5 Characters'),
        email: Yup.string().required('Please Submit A valid Password'),
        password: Yup.string().min(8).required('Password Must Be Atleast 5 Characters'),
        terms: Yup.boolean().oneOf([true]).required('Must Accept Terms to Conitnue')
    }),
    handleSubmit(values, {setStatus, resetForm}){
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                setStatus(res.data);
                resetForm('');
            })
            .catch(err => console.log("this is broke", err))
        // console.log(values)
    }
})(Onboarding);

export default FormikOnboarding;