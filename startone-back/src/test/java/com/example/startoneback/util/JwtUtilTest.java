package com.example.startoneback.util;

import com.auth0.jwt.interfaces.Claim;
import com.example.startoneback.user.User;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class JwtUtilTest {

    User user = User.builder()
            .email("liujunminx@gmail.com")
            .username("ljm")
            .build();

    @Test
    void generateToken() {
        String token = JwtUtil.generateToken(user);
        log.info("generated token: {}", token);
    }

    @Test
    void verifyToken() {
        String token = JwtUtil.generateToken(user);
        Map<String, Claim> stringClaimMap = JwtUtil.verifyToken(token);
        log.info("verifying token: {}", stringClaimMap);
    }
}