import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useGetUser = () => {
	const {user} = useContext(AuthContext);
	const [currentUser, setCurrentUser] = useState();
	useEffect(() => {
		fetch(`https://bismillah-enterprise-server.onrender.com/staff/uid_query/${user.uid}`)
			.then(res => res.json())
			.then(data => {
				setCurrentUser(data)
			})
	}, []);

	return [currentUser]
};

export default useGetUser;