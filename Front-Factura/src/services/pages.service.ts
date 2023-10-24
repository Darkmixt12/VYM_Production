
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Factura } from '../models/factura';
import {Observable} from 'rxjs';
import { Global } from './global';
import { Injectable } from '@angular/core';


@Injectable()
export class PagesService {
    public url:string;
    constructor(
      private _http: HttpClient,  
    ){
        this.url = Global.url
    }

	

}