package tn.backend.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.backend.entities.Project;
import tn.backend.repository.ProjectRepository;

import java.util.List;


@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService{

    ProjectRepository pr;
    @Override
    public List<Project> afficherProject() {
        return pr.findAll();
    }

    @Override
    public Project afficherProjectById(Long idP) {
        return pr.findById(idP).get();
    }

    @Override
    public Project ajouterProject(Project p) {
        return pr.save(p);
    }

    @Override
    public void supprimerProject(Long idP) {
        pr.deleteById(idP);
    }

    @Override
    public Project modifierProject(Project p) {
        return pr.save(p);
    }
}
