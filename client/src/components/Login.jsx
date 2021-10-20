import React, { useState } from "react"
import axios from 'axios'
import styles from './Login.module.css'; // Import css modules stylesheet as styles
import Box from '@mui/material/Box';
import { TextField, Typography, Button, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    // function getCookie(key) {
    //     var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    //     return b ? b.pop() : "";
    // }
    // let user_id = getCookie('user_id')

    const [errorState, setErrorState] = useState({})
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    })

    const [registerState, setRegisterState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const loginChangeHandler = e => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const registerChangeHandler = e => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register", registerState, { withCredentials: true })
            .then(res => {
                console.log(res)
                localStorage.setItem("user_id", res.data.user._id);
                history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                const { errors } = err.response.data;
                console.log(errors)
                const errObj = {}

                for (const [key, value] of Object.keys(errors)) {
                    console.log(errors[key])
                    errObj[key] = value;
                }
                setErrorState(errObj)
            })
    }

    const loginSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", loginState, { withCredentials: true })
            .then(res => {
                console.log(res)
                // console.log(res.data.user._id)
                // localStorage.setItem("user_id", res.data.user._id);
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    // const getAllUsers = () => {
    //     axios.get("http://localhost:8000/api/users", { withCredentials: true })
    //         .then(res => console.log(res))
    //         .catch(err => {
    //             console.log(err)
    //             console.log(err.response.status)
    //         })
    // }

    


    return (
        <div className={styles.bg}>
            <Grid container spacing={2} justify='center'>
                <Grid item xs={6} md={4} >
                    <Typography variant='h6' style={{marginTop: 30}}>Register</Typography>
                    <Box component="form" onSubmit={registerSubmit} sx={{ mt: 1, mr: 8 }}>
                        <TextField
                            onChange={registerChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            helperText={errorState.name? "Name is required" : ""}
                            autoFocus
                        />
                        <TextField
                            onChange={registerChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                        />
                        <TextField
                            onChange={registerChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <TextField
                            onChange={registerChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Comfirm Password"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Grid>
            
                <Grid item xs={6} md={4}>
                    <Typography variant='h6' style={{ marginTop: 30 }}>Login</Typography>
                    <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={loginChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            autoFocus
                        />
                        <TextField
                            onChange={loginChangeHandler}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {/* <button onClick={getAllUsers}>GET ALL USERS</button> */}
        </div>
    )
}
export default Login