import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-afficher-project',
  templateUrl: './afficher-project.component.html',
  styleUrls: ['./afficher-project.component.css']
})
export class AfficherProjectComponent {
  projects: any = [];

  constructor(
    private ps: ProjectService,
    private router: Router){}

  ngOnInit(){
    this.getAllProjects();
  }

  getAllProjects(){
    this.ps.viewProject().subscribe((res)=>{
      console.log(res);
      this.projects = res;
    })
  }

  deleteProject(id: number){
    this.ps.deleteProject(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    })
  }
}
