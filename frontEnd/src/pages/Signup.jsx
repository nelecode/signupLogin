import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils'

function Signup() {
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignup = (e) => {
        const { name, value } = e.target
        setSignup((pre) => ({ ...pre, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const { name, email, password } = signup
        if (!name || !email || !password) {
            handleError("all fields are required")
            setIsLoading(false)
            return
        }
        try {
            const url = "http://localhost:3000/auth/singup"
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(signup)
            })
            const result = await res.json()

            console.log(result)

            const { message, error, success } = result

            if (success) {
                handleSuccess(message)
                setIsLoading(false)
                setSignup({
                    name: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            }

            handleError(error.details[0].message)
            setIsLoading(false)

        } catch (error) {
            handleError(error)
        }
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name='name'
                        // autoFocus
                        placeholder='Enter Your Name'
                        onChange={handleSignup}
                        value={signup.name}
                    />
                </div>
                <div>
                    <label htmlFor="name">Email</label>
                    <input
                        type="text"
                        name='email'
                        // autoFocus
                        placeholder='Enter Your Email'
                        onChange={handleSignup}
                        value={signup.email}
                    />
                </div>
                <div>
                    <label htmlFor="name">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter Your Password...'
                        onChange={handleSignup}
                        value={signup.password}
                    />
                </div>
                <button >{isLoading ? "Loading..." : "Signup"}</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
                <ToastContainer />
            </form>
        </div>
    )
}

export default Signup