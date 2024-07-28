import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useLogout from "../../hooks/useLogout"
import useUser from '../../hooks/useUser'
import useAxiosPrivate from '../../hooks/usePrivate'

export default function User() {

    const { user } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState()
    const getUser = useUser()

    useEffect(() => {
        getUser()
        const fetchBalance = async () => {
            try {
                const res = await axiosPrivateInstance.get('http://127.0.0.1:8000/auth/balance');
                setBalance(res.data.balance);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchBalance();
    }, [])


    async function onLogout() {
        setLoading(true)

        await logout()
        navigate('/')
    }

    return (
        <div className='container mt-3'>
            <h4>{user?.id}</h4>
            <h4>{user?.username}</h4>
            <h4>{user?.email}</h4>
            <h4>{user?.first_name}</h4>
            <h4>{user?.last_name}</h4>
            <h4>{user?.wallet_address}</h4>
            <h4>Balance: {balance} ETH</h4>
            <h4>{user?.is_staff}</h4>
            <button disabled={loading} type='button' onClick={onLogout}>Logout</button>
        </div>
    )
}
