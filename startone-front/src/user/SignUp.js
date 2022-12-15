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
import {useState} from "react";
const theme = createTheme()

export default function SignUp(){

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password')
        })
    }

    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword:''
    })

    const [error, setError] = useState({
        username: '',
        password: '',
        confirmPassword:''
    })

    const onInputChange = e => {
        const {name, value} = e.target
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateInput = e => {
        let {name, value} = e.target
        setError(prevState => {
            const stateObj = { ...prevState, [name]: ''}

            switch (name){
                case "username":

            }
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <TextField
                            required
                            fullWidth
                            autoComplete="given-name"
                            name="username"
                            id="username"
                            label="Username"
                            value={input.username}
                            onChange={onInputChange}
                            onBlur={validateInput}
                            helperText=""
                            autoFocus
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                            sx={{mt:1}}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            sx={{mt:1}}
                        />
                        <TextField
                            required
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="confirm-password"
                            sx={{mt:1}}
                        />
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