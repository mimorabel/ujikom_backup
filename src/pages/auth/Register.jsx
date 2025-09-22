import React from 'react';
import {useState} from 'react'

export default function Register(){
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
        <div className='flex w-screen h-full m-10 justify-center'>
        <div className='w-xl h-xl bg-gray-100 shadow-md rounded-md'>
        <div className='flex gap-3 flex-col items-center mt-10 mb-10'>
            <h2 className='text-gray-700 font-bold text-xl mb-10 font-tahoma'>REGISTER</h2>
            <div className='flex flex-col gap-3'>
                <input type="text"
                    id={username}
                    value={form.username}
                    placeholder='Username'
                    className={`w-full h-7 px-2 py-4 bg-gray border-1 rounded-sm`}
                />
                <input type="text"
                        id={email}
                        value={form.email}
                        placeholder='Username'
                        className={`px-2 h-7 py-4 border-1 rounded-sm`}
                />
                <input type="text"
                        id={noTelp}
                        value={form.noTelp}
                        placeholder='Nomor Telepon'
                        className={`h-7 px-2 py-4 border-1 rounded-sm`}
                />
                <input type="text"
                        id={noTelp}
                        value={form.noTelp}
                        placeholder='Nomor Telepon'
                        className={`h-7 px-2 py-4 border-1 rounded-sm`}
                />
            </div>
            
        </div>
        </div>
        </div>

    )  
}


{/*<input type="text"
                    value={form.username}
                    placeholder='Username'
                    className='w-m bg-gray-100'
                />
                <input type="text"
                    value={form.noTelp}
                    placeholder='No Telp'
                    className='w-m bg-gray-100'
                />
                <input type="text"
                    value={form.email}
                    placeholder='email'
                    className='w-m bg-gray-100'
                />
                <input type="text"
                    value={form.password}
                    placeholder='password'
                    className='w-m bg-gray-100'
                />*/}