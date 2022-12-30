package com.example.startoneback.user;

import com.auth0.jwt.interfaces.Claim;
import com.example.startoneback.exception.UserExistsException;
import com.example.startoneback.util.JwtUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Slf4j
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/sign-up")
    public void signUp(@RequestBody User user){
        userService.signUp(user);
    }

    @PostMapping("/sign-in")
    public String signIn(@RequestBody SignInUser user, HttpServletResponse response){
        String token =  userService.authenticateUser(user.getUsernameOrEmail(), user.getPassword());
        if (token != null){
            Cookie cookie = new Cookie("access_token", token);
            cookie.setMaxAge(24 * 60 * 60);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        return token;
    }

    @GetMapping("/detail")
    public User detail(@CookieValue(value = "access_token", defaultValue = "") String accessToken){
        Map<String, Claim> userInfo = JwtUtil.verifyToken(accessToken);
        if (userInfo==null)
            return null;
        User user = new User();
        if (userInfo.containsKey("username"))
            user.setUsername(userInfo.get("username").asString());
        if (userInfo.containsKey("email"))
            user.setEmail(userInfo.get("email").asString());
        return user;
    }
}
