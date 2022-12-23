import {Container, Navbar} from "react-bootstrap";
import {Avatar} from "@mui/material";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

function Header(){
    return (
        <Navbar bg="dark" variant="dark" style={{height: 40}}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="../logo.svg"
                        width="20"
                        height="20"
                        className="d-inline-block align-top"
                    />{' '}
                    Start One
                </Navbar.Brand>
                <AccountCircleSharpIcon style={{height: 20, width: 20, color: 'white'}}/>
            </Container>
        </Navbar>
    )
}

export default Header