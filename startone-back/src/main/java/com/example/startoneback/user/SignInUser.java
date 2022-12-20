package com.example.startoneback.user;

import lombok.Data;

@Data
public class SignInUser {
    private String usernameOrEmail;
    private String password;
}
