import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  empleados:any[]=[];
  //inyeccion de dependencias
  constructor(private _empleadosservices:EmpleadoService,
              private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empleadosservices.getEmpleados().subscribe(data=>{
      this.empleados=[];
      //console.log(data);
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id:string){
    this._empleadosservices.eliminarEmpleado(id).then(()=>{
      console.log('Empleado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito', 'registro eliminado',{positionClass:'toast-bottom-right'});
    }).catch(error=>{
      console.log(error);
    });
  }

}
