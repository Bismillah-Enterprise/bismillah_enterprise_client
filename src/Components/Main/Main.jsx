import React, { useState } from 'react';
import Home from '../Home/Home';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from '../../firebase/firebase.init';

const Main = () => {
    const [modal, setModal] = useState(false);
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        const submitted_shop_code = document.getElementById('submitted_shop_code');
        const shop_main_code = document.getElementById('shop_main_code');
        if (submitted_shop_code.value == shop_main_code.innerText) {
            console.log('code match');
            console.log(auth, provider)
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log(result)
                    setModal(!modal);
                })
                .catch(error => {
                    console.log('Errror: ', error)
                })
        }
        else {
            console.log('code does not match')
        }
        submitted_shop_code.value = '';
    }

    return (
        <div className='bg-linear-to-r from-[#485563] to-[#29322c] min-h-[100vh] px-[10px] pt-[20px]'>
            <div id='shop_code_modal' className={`${!modal ? 'hidden' : 'block'} h-[250px] w-[300px] bg-black shadow-md shadow-pink-200 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='flex justify-end -top-[10px] -right-[10px] relative'>
                    <MdOutlineCancel onClick={() => { !setModal(!modal) }} className='text-pink-200 text-3xl cursor-pointer'></MdOutlineCancel>
                </div>
                <div className='text-pink-200 flex flex-col gap-5 p-8 items-center h-full w-full'>
                    <h1 className='text-2xl font-semibold'>Enter The Shop Code</h1>
                    <p id='shop_main_code' className='hidden'>12345</p>
                    <div className='px-3 border-2 rounded-xl h-8 shadow-2xl shadow-pink-300 mb-2 w-full'>
                        <input id='submitted_shop_code' type="password" className='outline-none' />
                    </div>
                    <Link onClick={handleGoogleLogin}><button className='text-pink-200 cursor-pointer shadow-md hover:shadow-lg shadow-pink-300 px-5 py-1 rounded-md text-lg font-semibold'>Submit</button></Link>
                </div>
            </div>
            <div className='flex items-center relative'>
                <div className="logo"><b>BIS<span>M</span>ILLAH ENTER<span>P</span>RISE</b></div>
                <div className='absolute right-10'>
                    <Link onClick={() => { setModal(!modal) }}><button className='text-pink-200 cursor-pointer shadow-md hover:shadow-lg shadow-pink-300 px-5 py-1 rounded-md text-lg font-semibold'>Staff Login</button></Link>
                </div>

            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;