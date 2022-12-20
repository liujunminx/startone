package com.example.startoneback.user;

import com.example.startoneback.exception.UserExistsException;
import jakarta.annotation.Resource;
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
    public boolean signIn(@RequestBody SignInUser user){
        return userService.authenticateUser(user.getUsernameOrEmail(), user.getPassword());
    }
}
