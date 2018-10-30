/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelperRemoteOwnerPassword extends AuthHelper implements TnsOAuth.ITnsAuthHelper {

    private options;

    constructor(options: TnsOAuth.ITnsOAuthOptionsRemoteOwnerPassword) {

        super();
        
        this.credentials = {} as any;
        Object.assign(this.credentials, options.oauthData);
        this.options = options;
    }

    public login(successPage?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            tnsOauth.loginViaRemoteOwnerPassword(this.options, successPage)
                .then((response: TnsOAuth.ITnsOAuthTokenResult) => {
                    this.tokenResult = response;
                    resolve(response.accessToken);
                })
                .catch((er) => {
                    reject(er);
                });
        });
    }

    public logout(successPage?: string): Promise<void> {
        return this._logout(successPage, []);
    }
}
