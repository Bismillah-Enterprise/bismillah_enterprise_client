import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Loading/Loading';
import { Navigate } from 'react-router-dom';

const StaffRoute = ({ children }) => {

	const { user } = useContext(AuthContext);
	const [isStaff, setIsStaff] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`https://bismillah-enterprise-server.onrender.com/staff/uid_query/${user?.uid}`)
			.then(res => res.json())
			.then(data => {
				if (data?.message?.message !== 'UID not find') {
					setIsStaff(true);
					setLoading(false);
				} else {
					setIsStaff(false);
					setLoading(false)
				}
			})
			.catch(() => {
				setIsStaff(false);
				setLoading(false);
			});
	}, [user]);

	if (loading) {
		return <Loading></Loading>;
	}

	if (!user || !isStaff) {
		return <Navigate to="/not_authorized" replace />;
	}

	return children;
};

export default StaffRoute;