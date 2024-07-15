package tn.backend.controllers;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.backend.entities.Project;
import tn.backend.services.ProjectService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/project")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {
    ProjectService ps;

    @GetMapping("/all")
    public List<Project> getProject(){
        List<Project> listProject = ps.afficherProject();
        return listProject;
    }

    @GetMapping("/show/{id}")
    public Project showProject(@PathVariable("id") Long projectId){
        Project pr = ps.afficherProjectById(projectId);
        return pr;
    }

    @PostMapping("/add")
    public Project addProject(@RequestBody Project p){
        Project project = ps.ajouterProject(p);
        return project;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProject(@PathVariable("id") Long projectId){
        ps.supprimerProject(projectId);
    }


    @PutMapping("/update/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project p){
        Project existingProject = ps.afficherProjectById(id);
        Project updatedProject = null;

        if(existingProject != null){
            existingProject.setNom(p.getNom());
            existingProject.setDescription(p.getDescription());
            existingProject.setDate_debut(p.getDate_debut());
            existingProject.setDate_fin(p.getDate_fin());
            existingProject.setStatus(p.getStatus());
            existingProject.setNom_res(p.getNom_res());
            existingProject.setNom_client(p.getNom_client());
            updatedProject = ps.modifierProject(p);
        }
        return updatedProject;
    }
}
