import { effect, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { AuthHttpService } from "../core/services/auth-http.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { AuthService } from "../core/services/auth.service";
import { Router } from "@angular/router";

export type authState = {
    token: string | null;
    error: string | null;
    isLoading: boolean;
}

const authInitialState: authState = {
    token: null,
    error: null,
    isLoading: false
  };
  

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(authInitialState),
    withMethods((store, authHttp = inject(AuthHttpService), authService = inject(AuthService), router = inject(Router))=>({
        login: rxMethod<{email: string, password: string}>(
            pipe(
                tap(() => patchState(store,{error: null, isLoading: true})),
                switchMap(({email, password}) => authHttp.login(email, password).pipe(
                    tapResponse({
                        next: ({token}) => {
                            authService.saveToken(token);
                            patchState(store, {token, isLoading: false});
                            router.navigate(['/dashboard']);
                        },
                        error: ({error}) => patchState(store, {error, isLoading: false})
                    }),
                )),
            )
        ),
        checkToken: rxMethod<{token: string}>(
            pipe(
                tap(() => patchState(store,{isLoading: true})),
                switchMap(({token}) => authHttp.checkToken(token).pipe(
                    tapResponse({
                        next: ({}) => patchState(store, {isLoading: false}),
                        error: ({error}) => {
                            authService.removeToken();
                            patchState(store, { token: null, error, isLoading: false})
                            router.navigate(['/login']);
                        }
                    }),
                ))
            )
        ),
        logout: rxMethod<void>(
            pipe(
                tap(() => patchState(store,{isLoading: true})),
                switchMap(() => authHttp.logout().pipe(
                    tapResponse({
                        next: ({}) => {
                            authService.removeToken();
                            patchState(store, {token: null, isLoading: false});
                            router.navigate(['/login']);
                        },
                        error: ({error}) => patchState(store, {error, isLoading: false})
                    })
                ))
            )
        ),
    }))
)