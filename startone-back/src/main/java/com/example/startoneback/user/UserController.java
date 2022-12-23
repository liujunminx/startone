package com.example.startoneback.user;

import com.example.startoneback.exception.UserExistsException;
import com.example.startoneback.util.JwtUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/sign-up")
    public void signUp(@RequestBody User user){
        userService.signUp(user);
    }

    @PostMapping("/sign-in")
    public String signIn(@RequestBody SignInUser user){
        return userService.authenticateUser(user.getUsernameOrEmail(), user.getPassword());
    }
}
