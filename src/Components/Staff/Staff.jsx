import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLoaderData, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Clock from '../Clock/Clock';
import useGetWifiIp from '../Hooks/useGetWifiIp';
import useIsAdmin from '../Hooks/useIsAdmin';
import Loading from '../Loading/Loading';


const Staff = () => {
    const {user} = useContext(AuthContext)
    const staff = useLoaderData();
    const { _id, name, hour_rate, today_enter1_time, today_exit1_time, today_enter2_time, today_exit2_time, message } = staff[0];
    const [isAllowed, setIsAllowed] = useState(false);
    const [wifiIp, wifiLoading] = useGetWifiIp();
    const [isAdmin] = useIsAdmin();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!wifiIp) return;
        setLoading(true);
        fetch('https://bismillah-enterprise-server.onrender.com/set_ip')
        .then(res => res.json())
        .then(data => {
                console.log({'gotit': data[0].wifi_ip, 'current': wifiIp})
                if(data[0].wifi_ip == wifiIp) {
                    console.log('ip matched')
                    setIsAllowed(true);
                    setLoading(false);
                }
                else{
                    setIsAllowed(false);
                    setLoading(false)
                }
            })
    }, [wifiIp])


    const now = new Date();

    // Format time and date

    const Time = now.toLocaleTimeString('en-BD', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const currentDayName = now.toLocaleDateString('en-BD', {
        weekday: 'long',
    });

    const currentDate = now.toLocaleDateString('en-BD', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    });

    // useEffect(() => {
    //     const now = new Date();

    //     // Set today's 8:20 PM
    //     const targetTime = new Date();
    //     targetTime.setHours(20, 52, 0, 0); // 8:20 PM

    //     const timeUntilTarget = targetTime.getTime() - now.getTime();

    //     // If it's already past 8:20 PM, skip today
    //     if (timeUntilTarget <= 0) return;

    //     const timerId = setTimeout(() => {
    //         // Call the server to reset data
    //         fetch(`https://bismillah-enterprise-server.onrender.com/reset_time/${_id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ enter1_time: '', exit1_time: '', enter2_time: '', exit2_time: '' }) // ✅ send an empty body (was incorrect)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log('⏰ Time reset successfully:', data);
    //                 location.reload()
    //             })
    //             .catch(err => {
    //                 console.error('❌ Failed to reset time:', err);
    //             });

    //         // Optional: setup for the next day (repeat every 24h)
    //         const intervalId = setInterval(() => {
    //             fetch(`https://bismillah-enterprise-server.onrender.com/reset_time/${_id}`, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ enter1_time: '', exit1_time: '', enter2_time: '', exit2_time: '' })
    //             })
    //         }, 24 * 60 * 60 * 1000); // every 24 hours

    //         // Clean up interval
    //         return () => clearInterval(intervalId);
    //     }, timeUntilTarget);

    //     // Cleanup timeout on unmount
    //     return () => clearTimeout(timerId);
    // }, [_id]);


    const handleTodayTime = (name, id) => {
        const updatedTime = { name, clickedTime: Time }
        setLoading(true)
        fetch(`https://bismillah-enterprise-server.onrender.com/staffs_daily_time/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTime)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "saved time",
                    showConfirmButton: false,
                    timer: 1000
                });
                location.reload();
            })
    }
    if(loading && wifiLoading) {
        <Loading></Loading>
    }
    return (
        <div>
            <Clock></Clock>
            {
                !message ?
                    <div>
                        <div>
                            <h1 className='text-2xl text-center text-pink-200 mt-5 font-semibold'>{name} - Hour Rate: {hour_rate}</h1>
                        </div>
                        <div className='flex items-center gap-5 md:gap-10 justify-center mt-10 flex-wrap'>
                            <button disabled={today_enter1_time === '' && isAllowed ? false : true} onClick={() => handleTodayTime('today_enter1_time', _id)} className='disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60 rounded-full p-3 h-[70px] md:h-[100px] w-[70px] md:w-[100px] shadow-md shadow-pink-200 border-none text-pink-200 text-sm md:text-lg cursor-pointer hover:shadow-lg'>Enter 1</button>
                            <button disabled={today_exit1_time === '' && isAllowed ? false : true} onClick={() => handleTodayTime('today_exit1_time', _id)} className='disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60 rounded-full p-3 h-[70px] md:h-[100px] w-[70px] md:w-[100px] shadow-md shadow-pink-200 border-none text-pink-200 text-sm md:text-lg cursor-pointer hover:shadow-lg'>Exit 1</button>
                            
                            <button disabled={today_enter2_time === '' && isAllowed ? false : true} onClick={() => handleTodayTime('today_enter2_time', _id)} className='disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60 rounded-full p-3 h-[70px] md:h-[100px] w-[70px] md:w-[100px] shadow-md shadow-pink-200 border-none text-pink-200 text-sm md:text-lg cursor-pointer hover:shadow-lg'>Enter 2</button>
                            <button disabled={today_exit2_time === '' && isAllowed ? false : true} onClick={() => handleTodayTime('today_exit2_time', _id)} className='disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60 rounded-full p-3 h-[70px] md:h-[100px] w-[70px] md:w-[100px] shadow-md shadow-pink-200 border-none text-pink-200 text-sm md:text-lg cursor-pointer hover:shadow-lg'>Exit 2</button>
                        </div>
                        <div className='flex items-center justify-center mt-10'>
                            <table className='text-pink-200 md:w-[70%] text-xs md:text-md'>
                                <tbody>
                                    <tr>
                                        <th>Date</th>
                                        <th>Day Name</th>
                                        <th>Enter 1</th>
                                        <th>Exit 1</th>
                                        <th>Enter 2</th>
                                        <th>Exit 2</th>
                                    </tr>
                                    <tr>
                                        <td id='today_date'>{currentDate}</td>
                                        <td id='today_day_name'>{currentDayName}</td>
                                        <td id='enter1_time'>{today_enter1_time}</td>
                                        <td id='exit1_time'>{today_exit1_time}</td>
                                        <td id='enter2_time'>{today_enter2_time}</td>
                                        <td id='exit2_time'>{today_exit2_time}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <div><p className='text-3xl text-pink-200 text-center'>{message}</p></div>
            }
        </div>
    );
};

export default Staff;