package com.example.startoneback.exception;

import jakarta.servlet.http.PushBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class UserExistsException extends RuntimeException{

    public UserExistsException(){
        super();
    }

    public UserExistsException(String message){
        super(message);
    }
}
