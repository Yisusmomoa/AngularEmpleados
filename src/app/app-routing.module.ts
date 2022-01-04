import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  {path:'',redirectTo:'list-empleados',pathMatch:'full'},
  {path:'list-empleados',component:ListEmpleadosComponent },
  {path:'create-empleado',component:CreateEmpleadoComponent},
  {path:'editEmpleado/:id',component:CreateEmpleadoComponent},
  {path:'**',redirectTo:'list-empleados',pathMatch:'full'},//permite que cuando pones cualquier cosa en la url, te redirecciona a la ruta especificada

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
