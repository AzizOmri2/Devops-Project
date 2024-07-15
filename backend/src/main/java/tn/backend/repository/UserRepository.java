package tn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.backend.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {
    User findFirstByEmail(String email);
}
