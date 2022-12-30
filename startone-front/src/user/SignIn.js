import {
    Avatar,
    Box, Button,
    Container,
    createTheme,
    CssBaseline, FormControlLabel, Grid, Link,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from "../components/Copyright";
import {useState} from "react";

import * as Yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme()

export default function SignIn(){

    const [errMsg, setErrMsg] = useState()

    const navigate = useNavigate()

    const formSchema = Yup.object().shape({
        usernameOrEmail: Yup.string()
            .required("Username or email address is required"),
        password: Yup.string()
            .required("Password is required")
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data, event) => {
        event.preventDefault()
        axios.post("/user/sign-in", {
            usernameOrEmail: data.usernameOrEmail,
            password: data.password
        }).then(response => {
            if (response){
                navigate("/")
            }
            else{
                setErrMsg("Incorrect username or password")
            }
        })
    }

    return (
        <ThemeProvider  theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="usernameOrEmail"
                            label="Username or email address"
                            name="usernameOrEmail"
                            autoComplete="usernameOrEmail"
                            autoFocus
                            {...register("usernameOrEmail")}
                            error={!!errors.usernameOrEmail}
                            helperText={errors.usernameOrEmail && errors.usernameOrEmail.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                        />
                        {errMsg && <Typography style={{color: "red"}} align={"center"}>{errMsg}</Typography>}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot your password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"/sign-up"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    )
}