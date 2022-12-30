import {Container, Navbar} from "react-bootstrap";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import axios from "axios";
import {Component} from "react";

class Header extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            username: null,
            email: null,
        }
        this.getUser()
    }

    getUser(){
        axios.get("/user/detail")
            .then(response => {
                console.log(response)
                if (response != null) {
                    this.setState({
                        username: response.data.username,
                        email: response.data.email
                    })
                }
            }).catch(error => {
            console.log(error)
        })
    }

    render() {
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
                    {/*{this.state.username && <AccountCircleSharpIcon style={{height: 20, width: 20, color: 'white'}}/>}*/}
                    {this.state.username && <h1 style={{color:"white"}} >{this.state.username}</h1>}
                </Container>
            </Navbar>
        )
    }
}

export default Header