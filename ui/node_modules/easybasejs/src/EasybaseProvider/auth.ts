import { POST_TYPES, AuthPostResponse, Globals, StatusResponse, EmailTemplate } from "./types";
import _g from "./g";
import utilsFactory from "./utils";
import fetch from 'cross-fetch';

export default function authFactory(globals?: Globals): any {
    const g = globals || _g;

    const { generateBareUrl, generateAuthBody, log } = utilsFactory(g);

    function _clearTokens() {
        g.token = "";
        g.refreshToken = "";
        g.newTokenCallback();
        g.userID = undefined;
    }

    const getUserAttributes = async (): Promise<Record<string, string>> => {
        try {
            const attrsRes = await tokenPost(POST_TYPES.USER_ATTRIBUTES);
            g.analyticsEnabled && g.analyticsEventsToTrack.get_user_attributes && g.analyticsEvent('get_user_attributes');
            return attrsRes.data;
        } catch (error) {
            log(error)
            return error;
        }
    }

    const setUserAttribute = async (key: string, value: string): Promise<StatusResponse> => {
        try {
            const setAttrsRes = await tokenPost(POST_TYPES.SET_ATTRIBUTE, {
                key,
                value
            });
            g.analyticsEnabled && g.analyticsEventsToTrack.set_user_attribute && g.analyticsEvent('set_user_attribute', { key });
            return {
                success: setAttrsRes.success,
                message: JSON.stringify(setAttrsRes.data)
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error",
                errorCode: error.errorCode || undefined
            };
        }
    }

    const forgotPassword = async (username: string, emailTemplate?: EmailTemplate): Promise<StatusResponse> => {
        try {
            const setAttrsRes = await tokenPost(POST_TYPES.FORGOT_PASSWORD_SEND, {
                username,
                emailTemplate
            });
            g.analyticsEnabled && g.analyticsEventsToTrack.forgot_password && g.analyticsEvent('forgot_password');
            return {
                success: setAttrsRes.success,
                message: setAttrsRes.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error",
                errorCode: error.errorCode || undefined
            };
        }
    }

    const forgotPasswordConfirm = async (code: string, username: string, newPassword: string): Promise<StatusResponse> => {
        try {
            const setAttrsRes = await tokenPost(POST_TYPES.FORGOT_PASSWORD_CONFIRM, {
                username,
                code,
                newPassword
            });
            g.analyticsEnabled && g.analyticsEventsToTrack.forgot_password_confirm && g.analyticsEvent('forgot_password_confirm');
            return {
                success: setAttrsRes.success,
                message: setAttrsRes.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error",
                errorCode: error.errorCode || undefined
            };
        }
    }

    const signUp = async (newUserID: string, password: string, userAttributes?: Record<string, string>): Promise<StatusResponse> => {
        try {
            const signUpRes = await tokenPost(POST_TYPES.SIGN_UP, {
                newUserID,
                password,
                userAttributes
            });
            g.analyticsEnabled && g.analyticsEventsToTrack.sign_up && g.analyticsEvent('sign_up', { method: "Easybase" });
            return {
                success: signUpRes.success,
                message: signUpRes.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error",
                errorCode: error.errorCode || undefined
            }
        }
    }

    const signIn = async (userID: string, password: string): Promise<StatusResponse> => {
        const t1 = Date.now();
        g.session = Math.floor(100000000 + Math.random() * 900000000);

        const integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";

        try {
            const res = await fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
                method: "POST",
                headers: {
                    'Eb-Post-Req': POST_TYPES.HANDSHAKE,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    version: g.ebconfig.version,
                    session: g.session,
                    instance: g.instance,
                    userID,
                    password
                })
            });

            const resData = await res.json();

            if (resData.token) {
                g.token = resData.token;
                g.refreshToken = resData.refreshToken;
                g.newTokenCallback();
                g.userID = resData.userID;
                g.mounted = true;
                const [validTokenRes, { hash }, { fromUtf8 }] = await Promise.all([tokenPost(POST_TYPES.VALID_TOKEN), import('fast-sha256'), import('@aws-sdk/util-utf8-browser')])
                const elapsed = Date.now() - t1;
                if (validTokenRes.success) {
                    log("Valid auth initiation in " + elapsed + "ms");
                    if (g.analyticsEnabled && g.analyticsEventsToTrack.login) {
                        const hashOut = hash(fromUtf8(g.GA_USER_ID_SALT + resData.userID));
                        const hexHash = Array.prototype.map.call(hashOut, x => ('00' + x.toString(16)).slice(-2)).join('');
                        g.analyticsIdentify(hexHash);
                        g.analyticsEvent('login', { method: "Easybase" });
                    }
                    return {
                        success: true,
                        message: "Successfully signed in user"
                    };
                } else {
                    return {
                        success: false,
                        message: "Could not sign in user"
                    };
                }
            } else {
                return {
                    success: false,
                    message: "Could not sign in user",
                    errorCode: resData.ErrorCode || undefined
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || "Could not sign in user",
                errorCode: error.errorCode || undefined
            };
        }
    }

    const resetUserPassword = async (currentPassword: string, newPassword: string): Promise<StatusResponse> => {
        if (typeof newPassword !== "string" || newPassword.length > 100) {
            return {
                success: false,
                message: "newPassword must be of type string"
            };
        }

        if (typeof currentPassword !== "string" || currentPassword.length > 100) {
            return {
                success: false,
                message: "currentPassword must be of type string"
            };
        }

        try {
            const setAttrsRes = await tokenPost(POST_TYPES.RESET_PASSWORD, { currentPassword, newPassword });
            g.analyticsEnabled && g.analyticsEventsToTrack.reset_user_password && g.analyticsEvent('reset_user_password');
            return {
                success: setAttrsRes.success,
                message: JSON.stringify(setAttrsRes.data)
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error",
                errorCode: error.errorCode || undefined
            };
        }
    }

    const userID = (): string | undefined => g.userID || undefined;

    const signOut = (): void => {
        g.token = "";
        g.newTokenCallback();
        g.userID = undefined;
    }

    const initAuth = async (): Promise<boolean> => {
        const t1 = Date.now();
        g.session = Math.floor(100000000 + Math.random() * 900000000);

        log(`Handshaking on${g.instance} instance`);

        const integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";

        try {
            const res = await fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
                method: "POST",
                headers: {
                    'Eb-Post-Req': POST_TYPES.HANDSHAKE,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    version: g.ebconfig.version,
                    tt: g.ebconfig.tt,
                    session: g.session,
                    instance: g.instance
                })
            });

            const resData = await res.json();

            if (resData.token) {
                g.token = resData.token;
                g.mounted = true;
                const validTokenRes = await tokenPost(POST_TYPES.VALID_TOKEN);
                const elapsed = Date.now() - t1;
                if (validTokenRes.success) {
                    log("Valid auth initiation in " + elapsed + "ms");
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const tokenPost = async (postType: POST_TYPES, body?: {}): Promise<AuthPostResponse> => {
        if (!g.mounted) {
            await initAuth();
        }

        const integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";

        const res = await fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
            method: "POST",
            headers: {
                'Eb-Post-Req': postType,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _auth: generateAuthBody(),
                ...body
            })
        });

        const resData = await res.json();

        if ({}.hasOwnProperty.call(resData, 'ErrorCode') || {}.hasOwnProperty.call(resData, 'code')) {
            if (resData.ErrorCode === "TokenExpired") {
                if (integrationType === "PROJECT") {
                    try {
                        const req_res = await tokenPost(POST_TYPES.REQUEST_TOKEN, {
                            refreshToken: g.refreshToken,
                            token: g.token
                        });
                        if (req_res.success) {
                            g.token = req_res.data.token
                            g.newTokenCallback();
                            return tokenPost(postType, body);
                        } else {
                            throw new Error(req_res.data || "Error");
                        }
                    } catch (error) {
                        _clearTokens();
                        return {
                            success: false,
                            data: error.message || error
                        }
                    }
                } else {
                    await initAuth();
                }
                return tokenPost(postType, body);
            } else {
                const err = new Error(resData.body || resData.ErrorCode || resData.code || "Error");
                (err as any).errorCode = resData.ErrorCode || resData.code;
                throw err;
            }
        } else {
            return {
                success: resData.success,
                data: resData.body
            }
        }
    }

    const tokenPostAttachment = async (formData: FormData, customHeaders: {}): Promise<AuthPostResponse> => {
        if (!g.mounted) {
            await initAuth();
        }

        const regularAuthbody = generateAuthBody();

        const attachmentAuth = {
            'Eb-token': regularAuthbody.token,
            'Eb-token-time': regularAuthbody.token_time,
            'Eb-now': regularAuthbody.now
        };

        const integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";

        const res = await fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
            method: "POST",
            headers: {
                'Eb-Post-Req': POST_TYPES.UPLOAD_ATTACHMENT,
                ...customHeaders,
                ...attachmentAuth
            },
            body: formData
        });

        const resData = await res.json();

        if ({}.hasOwnProperty.call(resData, 'ErrorCode') || {}.hasOwnProperty.call(resData, 'code')) {
            if (resData.ErrorCode === "TokenExpired") {
                if (integrationType === "PROJECT") {
                    try {
                        const req_res = await tokenPost(POST_TYPES.REQUEST_TOKEN, {
                            refreshToken: g.refreshToken,
                            token: g.token
                        });

                        if (req_res.success) {
                            g.token = req_res.data.token
                            g.newTokenCallback();
                            return tokenPostAttachment(formData, customHeaders);
                        } else {
                            throw new Error(req_res.data || "Error");
                        }
                    } catch (error) {
                        _clearTokens();
                        return {
                            success: false,
                            data: error.message || error
                        }
                    }
                } else {
                    await initAuth();
                }
                return tokenPostAttachment(formData, customHeaders);
            } else {
                const err = new Error(resData.body || resData.ErrorCode || resData.code || "Error");
                (err as any).errorCode = resData.ErrorCode || resData.code;
                throw err;
            }
        } else {
            return {
                success: resData.success,
                data: resData.body
            }
        }
    }

    return {
        initAuth,
        tokenPost,
        tokenPostAttachment,
        signUp,
        setUserAttribute,
        getUserAttributes,
        signIn,
        signOut,
        resetUserPassword,
        forgotPassword,
        forgotPasswordConfirm,
        userID
    }
}
