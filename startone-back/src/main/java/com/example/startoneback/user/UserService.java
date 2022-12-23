package com.example.startoneback.user;

import com.example.startoneback.exception.ServerInternalException;
import com.example.startoneback.exception.UserExistsException;
import com.example.startoneback.util.JwtUtil;
import jakarta.annotation.Resource;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Objects;

@Service
public class UserService {

    String secureRandomAlgorithm = "SHA1PRNG";

    String secretKeyFactoryAlgorithm = "PBKDF2WithHmacSHA1";

    int derivedKeyLength = 160;

    int iterations = 2000; // NIST specifies 10000

    @Resource
    private UserRepository userRepository;

    /**
     * user sign up and securely save password using hash algorithm with salt. Then save to db
     * @param user
     */
    public void signUp(User user){
        if (Objects.nonNull(userRepository.findByUsername(user.getUsername())))
            throw new UserExistsException("Username already taken");
        if (Objects.nonNull(userRepository.findByEmail(user.getEmail())))
            throw new UserExistsException("Email already taken");
        String salt = generateSalt();
        String password = getEncryptedPassword(user.getPassword(), salt);
        user.setPassword(password);
        user.setSalt(salt);
        userRepository.save(user);
    }

    /**
     * If the user pass authentication, return token
     * @param usernameOrEmail
     * @param inputPass
     * @return
     */
    public String authenticateUser(String usernameOrEmail, String inputPass){
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (user == null){
            return null;
        }else {
            String salt = user.getSalt();
            String calculatedHash = getEncryptedPassword(inputPass, salt);
            return calculatedHash.equals(user.getPassword())? JwtUtil.generateToken(user): null;
        }
    }

    /**
     * get an encrypted password using PBKDF2 hash algorithm
     * @param password
     * @param salt
     * @return
     */
    public String getEncryptedPassword(String password, String salt) {
        byte[] saltBytes = Base64.getDecoder().decode(salt);
        KeySpec keySpec = new PBEKeySpec(password.toCharArray(), saltBytes, iterations, derivedKeyLength);
        SecretKeyFactory factory = null;
        try {
            factory = SecretKeyFactory.getInstance(secretKeyFactoryAlgorithm);
            byte[] encBytes = factory.generateSecret(keySpec).getEncoded();
            return Base64.getEncoder().encodeToString(encBytes);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new ServerInternalException("Encrypted password with salt fail", e);
        }
    }

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
        byte[] bytes = new byte[8];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }
}
