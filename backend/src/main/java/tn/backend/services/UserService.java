package tn.backend.services;


import org.springframework.stereotype.Service;
import tn.backend.dto.SignupDTO;
import tn.backend.dto.UserDTO;
import tn.backend.entities.User;

import java.util.List;

@Service
public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);
    boolean hasUserWithEmail(String email);

    public User getUserById(long id);

    public List<User> afficher();
}
