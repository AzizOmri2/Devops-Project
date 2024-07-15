package tn.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.backend.dto.SignupDTO;
import tn.backend.dto.UserDTO;
import tn.backend.entities.User;
import tn.backend.services.UserService;

import java.util.List;


@RestController
public class SignupController {

    @Autowired
    private UserService userService;


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO) {
        if (userService.hasUserWithEmail(signupDTO.getEmail().toString())) {
            return new ResponseEntity<>("User already exist", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDTO createUser = userService.createUser(signupDTO);
        if (createUser == null) {
            return new ResponseEntity<>("user not created , Come later !" , HttpStatus.BAD_REQUEST);
        }
        return  new ResponseEntity<>(createUser,HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/get-user/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/usersList")
    public List<User> getUsers() {
        return userService.afficher();
    }
}
