import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-ajouter-project',
  templateUrl: './ajouter-project.component.html',
  styleUrls: ['./ajouter-project.component.css']
})
export class AjouterProjectComponent {
  postProjectForm!: FormGroup;
  status: string = "";

  constructor(
    private ps: ProjectService, 
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(){
    this.postProjectForm = this.fb.group({
      nom: [null, [Validators.required]],
      nom_client: [null, [Validators.required]],
      nom_res: [null, [Validators.required]],
      date_debut: [null, [Validators.required]],
      date_fin: [null, [Validators.required]],
      status: ['', [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  postProject(){
    console.log(this.postProjectForm.value);
    this.ps.addProject(this.postProjectForm.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl("dashboard/projects");
    })
  }

  clearFormProject(){
    this.postProjectForm.reset();
  }
}
