import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI } from '../Services/allApi';

function Authentication() {
    const [userDetails, setUserDetails] = useState({ uName: "", email: "", password: "" })
    const [invalidUserDetails, setInvalidUserDetails] = useState({ uName: false, email: false, password: false })
    const navigate = useNavigate()

    const handleInput = (tag) => {
        const { name, value } = tag
        switch (name) {
            case 'uName': !!value.match(/^[A-Za-z ]{3,}$/) ? setInvalidUserDetails({ ...invalidUserDetails, uName: false }) : setInvalidUserDetails({ ...invalidUserDetails, uName: true })
                setUserDetails({ ...userDetails, uName: value })
                break;

            case 'email': !!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? setInvalidUserDetails({ ...invalidUserDetails, email: false }) : setInvalidUserDetails({ ...invalidUserDetails, email: true })
                setUserDetails({ ...userDetails, email: value })
                break;

            case 'password': !!value.match(/^(([a-zA-Z0-9])+([@#$&*_])*){4,}$/) ? setInvalidUserDetails({ ...invalidUserDetails, password: false }) : setInvalidUserDetails({ ...invalidUserDetails, password: true })
                setUserDetails({ ...userDetails, password: value })
                break;

            default:
                break;
        }
    }

    const handleLogin = async () => {
        const hasInvalidProperty = Object.values(invalidUserDetails).some((value) => value)
        if (userDetails.email && userDetails.password && !hasInvalidProperty) {
            try {
                const result = await loginAPI(userDetails)
                if (result.status == 200) {
                    toast.success("Login Successfull!")
                    sessionStorage.setItem("user", JSON.stringify(result?.data?.user))
                    sessionStorage.setItem("token", result.data.token)
                    navigate('/')
                    setUserDetails({
                        uName: "", email: "", password: ""
                    })
                } else {
                    if (result.response.status == 404) {
                        toast.error(result.response.data)
                        setUserDetails({
                            uName: "", email: "", password: ""
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info("Please fill the form properly!!")
        }
    }

    return (
        <>
            <div className="auth-container">
                <div className="auth-box">
                    <h4 className='fw-semibold text-center'>
                        LOGIN
                    </h4>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        margin="normal"
                        className='w-100'
                        onChange={(e) => handleInput(e.target)}
                        {...(invalidUserDetails.email && { error: true, helperText: "Invalid email" })}
                        value={userDetails.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        className='w-100'
                        onChange={(e) => handleInput(e.target)}
                        {...(invalidUserDetails.password && { error: true, helperText: "Invalid Password" })}
                        value={userDetails.password}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleLogin}
                    >Login</Button>
                </div>
            </div >
            <ToastContainer position='top-center' theme='colored' autoClose={1000} />
        </>
    )
}

export default Authentication