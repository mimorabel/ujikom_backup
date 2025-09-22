import React from 'react';
import {useState} from 'react';

export default function LoginPage(){
const [formData, setFormData] = useState();
const [username, setUsername] = useState();
const [email, setEmail] = useState();
const [noTelp, setNoTelp] = useState();
const [password, setPassword] = useState(); 
const form = [
    username,
    email,
    noTelp,
    password,
];

    return(
        <div className='w-screen h-screen'>
            <div className='w-250 h-250 bg-red-200'>
                <div className='flex flex-row'>
                    <input type="text"
                        value={form.username}
                        placeholder='Username'
                        className='w-m h-m bg-gray border-none'
                    />
                </div>
            </div>
        </div>
    )
}