import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp } from '../dataTypes';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    URL : string = "http://localhost:3000/seller";
    constructor(private httpClient: HttpClient) { }
    userSignup(data: SignUp) {
        return this.httpClient.post(this.URL,data);
    }
}

