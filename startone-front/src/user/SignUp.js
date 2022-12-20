import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline, Grid, Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from "../components/Copyright";
import {useForm} from "react-hook-form"
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {useState} from "react";


const theme = createTheme()

export default function SignUp(){

    const [errMsg, setErrMsg] = useState()

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        email: Yup.string().email()
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match")
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data, event) => {
        event.preventDefault()
        axios.post("/user/sign-up", {
            username: data.username,
            email: data.email,
            password: data.password
        }).then(data => {
            console.log(data)
        }).catch(error => {
            setErrMsg(error.message)
        })
    }

    return(
        <ThemeProvider theme={theme}>
            <Container conponent="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{m:1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                        <TextField
                            required
                            fullWidth
                            autoComplete="given-name"
                            id="username"
                            label="Username"
                            {...register("username")}
                            autoFocus
                            error={!!errors.username}
                            helperText={errors.username && errors.username.message}
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            autoComplete="email"
                            sx={{mt:1}}
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            sx={{mt:1}}
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                        />
                        <TextField
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="confirm-password"
                            sx={{mt:1}}
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword && errors.confirmPassword.message}
                        />
                        {errMsg && <Typography style={{color: "red"}} align={"center"}>{errMsg}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/sign-in"} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    )
}