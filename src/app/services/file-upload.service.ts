import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  

  async actualizarFoto(
    archivo:File|undefined|any,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string
  ){
    
    try {

      const url=`${base_url}/upload/${tipo}/${id}`
      const formData = new FormData()
      formData.append('imagen',archivo)

      const resp = await fetch(url,{
        method:'put',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body:formData
      })

      const data = await resp.json()
      return data
            
    } catch (error) {
      console.log(error);
      return null
    }

    

  }

}
