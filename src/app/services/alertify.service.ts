import { Injectable } from '@angular/core';
declare let alertify:any; //it is looking "alertify" for sub dirs 


@Injectable({ //this is a mandatory service decorator
  providedIn: 'root' // root means this service is a global service
})
export class AlertifyService {

  constructor() { }

  success(message:string){
    alertify.success(message)
  }
  error(message:string){
    alertify.error(message)
  }
  warning(message:string){
    alertify.warning(message)
  }
}
