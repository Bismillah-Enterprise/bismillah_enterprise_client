import React, { useState } from 'react';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { Link, Outlet, useLoaderData } from 'react-router-dom';

const Admin = () => {
    const allStaffs = useLoaderData();
    const [isMenu, setIsMenu] = useState(false);
    // const handleMobileMenu = () => {
    //     const menuIcon = document.getElementById('mobileMenu')
    //     menuIcon.classList.remove('-left-[190px]');
    // }
    return (
        <div className='md:flex gap-5 items-start justify-center w-full text-pink-200 mt-10'>

            <div onClick={() => {setIsMenu(false)}} className='min-h-fit w-[28%] rounded-2xl shadow-lg shadow-pink-300 hidden md:flex gap-5 flex-col items-center'>
                <Link to={"/"} className='w-full shadow-md hover:shadow-pink-400 rounded-t-2xl shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    Home
                </Link>
                <Link to={"/admin/user_request"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    User Request
                </Link>
                <Link to={"/admin/user_account_manipulation"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    User Account Manipulation
                </Link>
                <Link to={"/admin/staff_manipulation"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    Staff Manipulation
                </Link>
                <Link to={"/admin/user_ip"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    Set Shop Wi-Fi IP
                </Link>
                <Link to={"/admin/shop_code"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    Set Shop Code
                </Link>
                <Link to={"/admin/notice_panel"} className='rounded-b-2xl w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                    Notice Panel
                </Link>
            </div>
            <div className='block md:hidden absolute'>
                <div id='mobileMenu' className={`relative ${isMenu? 'left-0' : '-left-[190px]'} -top-8 duration-300`}>
                    <RiMenuUnfoldFill onClick={() => {setIsMenu(!isMenu)}} className='absolute -right-10 top-2' />
                    <div onClick={() => {setIsMenu(false)}} className='w-[170px] min-h-fit rounded-2xl shadow-lg shadow-pink-300 flex md:hidden flex-col items-center bg-linear-to-r from-[#485563] to-[#29322c]'>
                        <Link to={"/"} className='w-full shadow-md hover:shadow-pink-400 rounded-t-2xl shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            Home
                        </Link>
                        <Link to={"/admin/user_request"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            User Request
                        </Link>
                        <Link to={"/admin/user_account_manipulation"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            User Account Manipulation
                        </Link>
                        <Link to={"/admin/staff_manipulation"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            Staff Manipulation
                        </Link>
                        <Link to={"/admin/user_ip"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            Set Shop Wi-Fi IP
                        </Link>
                        <Link to={"/admin/shop_code"} className='w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            Set Shop Code
                        </Link>
                        <Link to={"/admin/notice_panel"} className='rounded-b-2xl w-full shadow-md hover:shadow-pink-400 shadow-pink-300 py-3 font-semibold text-center cursor-pointer'>
                            Notice Panel
                        </Link>

                    </div>
                </div>
            </div>
            <div onClick={() => {setIsMenu(false)}} className='min-h-[60vh] w-full md:w-[68%] rounded-2xl shadow-lg shadow-pink-300 flex items-start justify-center p-5'>
                <Outlet></Outlet>
            </div>

            {/* {
                allStaffs.map(staff => <div key={staff._id}>{staff.name}</div>)
            } */}
        </div>
    );
};

export default Admin;