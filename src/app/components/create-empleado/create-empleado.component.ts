import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

//decorador
@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})

export class CreateEmpleadoComponent implements OnInit {
  createEmpleado:FormGroup;
  submited=false;
  loading=false;
  id:string|null;
  titulo='Agregar empleado';

  constructor(private fb:FormBuilder,
    private _empleadoService:EmpleadoService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute:ActivatedRoute) { 
    this.createEmpleado=fb.group({
      nombre:['',Validators.required],//el primer campo es el default, el segundo es una validación, puede tener más de una validación
      apellido:['',Validators.required],
      documento:['',Validators.required],
      salario:['',Validators.required]
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarEmpleado(){
    this.submited=true;
    this.titulo="Agregar empleado"

    if(this.createEmpleado.invalid){
      return;
    }
    if(this.id===null){
      this.agregarEmpleado();
    }
    else{
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado(){
    const empleado:any={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaCreacion:new Date(),
      fechaActualizacion:new Date()
    }
    this.loading=true;
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      //console.log("Empleado registrado con exito");
      this.toastr.success('Empleado registrado!', 'El empleado fue registrado con exito!',{positionClass:'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/list-empleados']);

    }).catch(error=>{
      console.log(error);
      this.loading=false;
      
    })

    console.log(empleado);
  }

  editarEmpleado(id:string){
    const empleado:any={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaActualizacion:new Date()
    }
    this.loading=true;
    this._empleadoService.actualizarEmpleado(id,empleado).then(()=>{
      this.loading=false;
      this.toastr.info('El empleado fue modificado con exito', 'empleado con exito',{positionClass:'toast-bottom-right'});
    });
    this.router.navigate(['/list-empleados']);


  }

  esEditar(){
    this.titulo="Editar empleado"

    if(this.id!==null){
      this.loading=true;
      this._empleadoService.getEmpleado(this.id).subscribe(data=>{
        this.loading=false;
        //console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre:data.payload.data()['nombre'],
          apellido:data.payload.data()['apellido'],
          documento:data.payload.data()['documento'],
          salario:data.payload.data()['salario'],
          
        })
      });
    }
  }
}
