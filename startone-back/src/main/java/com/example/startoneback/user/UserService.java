package com.example.startoneback.user;

import com.example.startoneback.exception.ServerInternalException;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class UserService {

    String secureRandomAlgorithm = "SHA1PRNG";

    /**
     * generate secure random salt according to NIST recommendation
     * @return
     */
    public String generateSalt(){
        SecureRandom random = null;
        try {
            random = SecureRandom.getInstance(secureRandomAlgorithm);
        } catch (NoSuchAlgorithmException e) {
            throw new ServerInternalException(String.format("SecureRandom get %s instance fail", secureRandomAlgorithm), e);
        }
        // NIST recommended 4 bytes. and We use 8.
        byte[] saltBytes = new byte[8];
        random.nextBytes(saltBytes);
        return Base64.getEncoder().encodeToString(saltBytes);
    }
}
