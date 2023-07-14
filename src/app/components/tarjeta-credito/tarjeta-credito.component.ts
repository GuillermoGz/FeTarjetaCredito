import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {
  listTarjetas : any[] = [];
  accion : string = 'Agregar'
  form:FormGroup;
  id : number | undefined;
  tipo:boolean = false;
  revelar : string = 'password';
  constructor(private fb: FormBuilder,private toastr: ToastrService,private _tarjetaService:TarjetaService){
    this.form = this.fb.group({
      titular:['',Validators.required],
      numeroTarjeta:['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    });
  }
  ngOnInit():void{
    this.obtenerTarjeta();
  }
  obtenerTarjeta(){
    this._tarjetaService.getListTarjeta().subscribe({
      next: (data) => this.listTarjetas = data,
      error: (e) => console.error(e)})
  }
  agregarTarjeta(){
    const tarjeta : any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    if(this.id == undefined){ 
    this._tarjetaService.saveTarjeta(tarjeta).subscribe({
      next: () => {this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada');
      this.obtenerTarjeta()},
      error: () => this.toastr.error('Opss.. ocurrio un error!', 'Error')})
    }else{
      tarjeta.id = this.id
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe({
        next: () => {this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
        this.obtenerTarjeta()},
        error: () => this.toastr.error('Opss.. ocurrio un error!', 'Error')})
      
    }
    this.accion = 'Agregar'
    this.form.reset()
  }
  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe({
      next: () => {this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta Eliminada');
      this.obtenerTarjeta()},
      error: (e) => console.error(e)})
    
  }
  editarTarjeta(tarjeta:any){
    this.accion = 'Editar'
    this.id = tarjeta.id
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
  }
  revelarPassword(tipo:boolean){
    this.tipo = tipo;
    this.revelar = tipo ? 'text' : 'password'
  }
}
