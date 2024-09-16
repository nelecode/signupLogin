import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

function Home() {
    const [user, setUser] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        setUser(localStorage.getItem("logedInUser"))
    }, [])

    const fetchData = async () => {
        try {

            const headers = {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            const url = "https://signup-login-f77z.vercel.app/products"
            const res = await fetch(url, headers)
            const result = await res.json()
            setProducts(result)
        } catch (error) {
            handleError(error)

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const navigate = useNavigate()

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("logedInUser")
        handleSuccess("Successfully Log-Out")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }
    return (
        <div>
            <h1>
                {user}
            </h1>
            <button onClick={handleLogOut}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => {
                        return <ul key={index}>
                            <span>{item.Name} : </span>
                            <span>{item.rate}</span>
                        </ul>
                    })
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
