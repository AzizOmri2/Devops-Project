package tn.backend.services;

import tn.backend.entities.Project;

import java.util.List;

public interface ProjectService {
    public List<Project> afficherProject();
    public Project afficherProjectById(Long idP);
    public Project ajouterProject(Project p);
    public void supprimerProject(Long idP);
    public Project modifierProject(Project p);
}
