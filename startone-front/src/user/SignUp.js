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
                            autoComplete="given-name"
                            name="username"
                            id="username"
                            required
                            fullWidth
                            label="Username"
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