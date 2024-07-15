package tn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.backend.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    Project findProjectByNom(String nom);
}
