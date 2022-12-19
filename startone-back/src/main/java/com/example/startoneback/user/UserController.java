package com.example.startoneback.user;

import com.example.startoneback.exception.UserExistsException;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Resource
    private UserRepository userRepository;

    @PostMapping("/sign-up")
    public void signUp(@RequestBody User user){
        if (Objects.nonNull(userRepository.findByUsername(user.getUsername())))
            throw new UserExistsException("Username already taken");
        if (Objects.nonNull(userRepository.findByEmail(user.getEmail())))
            throw new UserExistsException("Email already taken");
        userRepository.save(user);
    }
}
