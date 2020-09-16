export class AppConstants {
    public static CLOUDSHARE_ENDPOINT = 'https://dnir4bjh4dv2w.cloudfront.net/'
    public static EMAIL_DISPATCH_ENDPOINT = 'https://foh-email-dispatch.herokuapp.com/api/'
    public static EMAIL_DISPATCH_SEND = AppConstants.EMAIL_DISPATCH_ENDPOINT + 'send'
    public static CONTACT_EMAIL = 'vinceohea@hotmail.com'
    public static emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
 }