import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "./user.model";
export interface AuthResponseData {
    expiresIn: string,
    kind: string,
    refreshToken: string,
    idToken: string,
    email: string,
    locaId: string,
    registered?: boolean

}
@Injectable({ providedIn: 'root' })


export class AuthService {
    user = new BehaviorSubject<UserModel>(null)
    constructor(private http: HttpClient) { }

    singUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFG9nDgArbHV0xVQ-qK6gy8pqqiKWSAUM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),tap((resData)=>{
                this.handleAuthentication(resData.email,resData.idToken,resData.locaId,+resData.expiresIn)
            }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFG9nDgArbHV0xVQ-qK6gy8pqqiKWSAUM', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap((resData)=>{
            console.log(resData)
            this.handleAuthentication(resData.email,resData.idToken,resData.locaId,+resData.expiresIn)
        })) 
    }

    //handle Authentication 
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new UserModel(email, userId, token, expirationDate);
        console.log(user)
        this.user.next(user);
    }
    //handling errors
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unkown error occured!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email is already Exist';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email is not found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is Incorrect';
                break;

        }
        return throwError(errorMessage)
    }
}