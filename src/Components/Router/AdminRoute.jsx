import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Loading/Loading';

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        fetch(`https://bismillah-enterprise-server.onrender.com/staff/uid_query/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.user_category === 'admin') {
                    setIsAdmin(true);
                    setLoading(false);
                } else {
                    setIsAdmin(false);
                    setLoading(false);
                }
                
            })
            .catch(() => {
                setIsAdmin(false);
                setLoading(false);
            });
    }, [user]);

    // ⏳ Still checking or auth not ready
    if (loading) {
        return <Loading></Loading>;
    }

    // 🚫 Not logged in or not admin
    if (!user || !isAdmin) {
        return <Navigate to="/not_authorized" replace />;
    }

    // ✅ Authorized admin
    return children;
};

export default AdminRoute;