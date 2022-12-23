package com.example.startoneback.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.startoneback.user.User;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtUtil {
    /**
     * secret key
     */
    private static final String SECRET = "start-one-token";

    /**
     * expire date
     */
    private static final long EXPIRATION = 24 * 60 * 60;

    public static String generateToken(User user){
        Date expireDate = new Date(System.currentTimeMillis() + EXPIRATION * 1000);
        Map<String, Object> claimMap = new HashMap<>();
        claimMap.put("alg", "HS256");
        claimMap.put("typ", "JWT");
        return JWT.create()
                .withHeader(claimMap)
                .withClaim("username", user.getUsername())
                .withClaim("email", user.getEmail())
                .withExpiresAt(expireDate)
                .withIssuedAt(new Date())
                .sign(Algorithm.HMAC256(SECRET));
    }

    public static Map<String, Claim> verifyToken(String token){
        DecodedJWT jwt = null;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwt = verifier.verify(token);
        }catch (Exception e){
            log.error("Token【{}】 parse fail", token);
            return null;
        }
        return jwt.getClaims();
    }
}
