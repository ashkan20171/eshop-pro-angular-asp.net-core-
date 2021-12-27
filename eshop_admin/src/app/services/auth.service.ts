import {Injectable} from '@angular/core';

import {IResponseResult} from '../DTOs/Common/IResponseResult';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrentUser} from '../DTOs/Account/CurrentUser';
import {HttpClient} from '@angular/common/http';
import {RegisterUserDTO} from '../DTOs/Account/RegisterUserDTO';
import {LoginUserDTO} from '../DTOs/Account/LoginUserDTO';
import {ILoginUserAccount} from '../DTOs/Account/ILoginUserAccount';
import {ICheckUserAuthResult} from '../DTOs/Account/ICheckUserAuthResult';
import {EditUserDTO} from '../DTOs/Account/EditUserDTO';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = false;
    private currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);

    constructor(
        private http: HttpClient
    ) {
    }

    setCurrentUser(user: CurrentUser): void {
        this.currentUser.next(user);
        this.loggedIn = user !== null;
    }

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            resolve(this.loggedIn);
        });

        return promise;
    }

    getCurrentUser(): Observable<CurrentUser> {
        return this.currentUser;
    }

    loginUser(loginUserDTO: LoginUserDTO): Observable<ILoginUserAccount> {
        return this.http.post<ILoginUserAccount>('/AdminAccount/login', loginUserDTO);
    }

    checkAdminAuth(): Observable<ICheckUserAuthResult> {
        return this.http.post<ICheckUserAuthResult>('/AdminAccount/check-admin-auth', null);
    }

    logOutUser(): Observable<any> {
        return this.http.get('/Account/sign-out');
    }
}
