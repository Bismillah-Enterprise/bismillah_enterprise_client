import React, { useContext, useEffect, useState } from 'react';

const useGetWifiIp = () => {
	const [wifiIp, setWifiIp] = useState(null);
	const [wifiLoading, setwifiLoading] = useState(false);
	useEffect(() => {
		setwifiLoading(true);
		fetch('https://bismillah-enterprise-server.onrender.com/get_network_ip')
			.then(res => res.json())
			.then(data => {
				setWifiIp(data.ip);
				setwifiLoading(false);
			})
	}, [])

	return [wifiIp, wifiLoading]
};

export default useGetWifiIp;