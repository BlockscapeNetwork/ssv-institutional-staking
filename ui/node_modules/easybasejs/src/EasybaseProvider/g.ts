import { Ebconfig, EasybaseProviderPropsOptions, Globals, EasybaseProviderProps, GoogleAnalyticsEvents } from "./types";

namespace GlobalNamespace {
    export let ebconfig: Ebconfig;
    export let token: string;
    export let refreshToken: string;
    export let session: number;
    export let options: EasybaseProviderPropsOptions;
    export let instance: "Node" | "React" | "React Native";
    export let mounted: boolean;
    export let newTokenCallback: () => {};
    export let userID: string;
    export let analyticsEnabled: boolean;
    export let analyticsEventsToTrack: GoogleAnalyticsEvents;
    export let analyticsEvent: () => {};
    export let analyticsIdentify: () => {};
    export let GA_USER_ID_SALT: string; // https://support.google.com/analytics/answer/6366371?hl=en#hashed
}

const _g: Globals = { ...GlobalNamespace };

export default _g;

export function gFactory({ ebconfig, options }: EasybaseProviderProps): Globals {
    const optionsObj = { ...options }; // Forces undefined to empty object
    const gaTrackingObj = options ? options.googleAnalyticsEventTracking : {};
    const defaultG = {
        options: optionsObj,
        ebconfig: ebconfig,
        GA_USER_ID_SALT: "m83WnAPrq",
        analyticsEventsToTrack: {
            login: true,
            sign_up: true,
            forgot_password: true,
            forgot_password_confirm: true,
            reset_user_password: true,
            ...gaTrackingObj
        }
    }
    return { ...GlobalNamespace, ...defaultG } as Globals;
}
