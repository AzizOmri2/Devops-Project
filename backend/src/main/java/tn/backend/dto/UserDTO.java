package tn.backend.dto;

import lombok.Data;
import tn.backend.entities.UserRole;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;

}
