import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils'

function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        const { name, value } = e.target
        setLogin((pre) => ({ ...pre, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const { email, password } = login
        if (!email || !password) {
            handleError("all fields are required")
            setIsLoading(false)
            return
        }
        try {
            const url = "https://signup-login-f77z.vercel.app/auth/login"
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(login)
            })
            const result = await res.json()

            const { message, error, success, jwtToken, name } = result

            if (success) {
                handleSuccess(message)
                localStorage.setItem("token", jwtToken)
                localStorage.setItem("logedInUser", name)
                setIsLoading(false)
                setLogin({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate("/home")
                }, 1000)

                return
            }

            handleError(message)
            setIsLoading(false)

        } catch (error) {
            handleError(error)
        }
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name='email'
                        // autoFocus
                        placeholder='Enter Your Email'
                        onChange={handleLogin}
                        value={login.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter Your Password...'
                        onChange={handleLogin}
                        value={login.password}
                    />
                </div>
                <button >{isLoading ? "Loading..." : "Login"}</button>
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                <ToastContainer />
            </form>
        </div>
    )
}

export default Login
