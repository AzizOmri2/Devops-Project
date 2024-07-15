import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modifier-project',
  templateUrl: './modifier-project.component.html',
  styleUrls: ['./modifier-project.component.css']
})
export class ModifierProjectComponent {
  id: number = this.activatedRoute.snapshot.params["id"];

  updateProjectForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ps: ProjectService,
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(){
    this.updateProjectForm = this.fb.group({
      id: this.id,
      nom: [null, [Validators.required]],
      nom_client: [null, [Validators.required]],
      nom_res: [null, [Validators.required]],
      date_debut: [null, [Validators.required]],
      date_fin: [null, [Validators.required]],
      status: ['', [Validators.required]],
      description: [null, [Validators.required]]
    })
    this.getProjectById();
  }

  getProjectById(){
    this.ps.viewProjectById(this.id).subscribe((res)=>{
      console.log(res);
      this.updateProjectForm.patchValue(res);
      const formattedDateD = res.date_debut.split('T')[0];
      const formattedDateF = res.date_fin.split('T')[0];
      this.updateProjectForm.patchValue({
        nom: res.nom,
        nom_client: res.nom_client,
        nom_res: res.nom_res,
        date_debut: formattedDateD,
        date_fin: formattedDateF,
        status: res.status,
        description: res.description
      });
    })
  }

  updateProject(){
    this.ps.updateProject(this.id,this.updateProjectForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("dashboard/projects");
      }
    })
  }
}
