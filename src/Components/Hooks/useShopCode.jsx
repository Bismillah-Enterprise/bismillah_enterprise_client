import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useRefetch from './useRefetch';

const useShopCode = () => {
	const {user} = useContext(AuthContext)
	const [shopCode, setShopCode] = useState();
	const [codeLoading, setCodeLoading] = useState(false);
	useEffect(() => {
		setCodeLoading(true)
		fetch(`https://bismillah-enterprise-server.onrender.com/shop_code/${import.meta.env.VITE_shop_coce_object_id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setShopCode(data[0].shop_code);
				setCodeLoading(false);
			})
	}, [user]);

	return [shopCode, codeLoading]
};

export default useShopCode;