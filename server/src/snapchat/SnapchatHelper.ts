import qs from 'qs';
import crypto from 'crypto';

const OAUTH2_STATE_BYTES = 32;
const REGEX_PLUS_SIGN = /\+/g;
const REGEX_FORWARD_SLASH = /\//g;
const REGEX_EQUALS_SIGN = /=/g;
const SNAP_ACCOUNTS_LOGIN_URL =
  'https://accounts.snapchat.com/accounts/oauth2/auth';
// generate random byte buffer
const generateRandomBytes = (size: number = OAUTH2_STATE_BYTES): Buffer => {
  return crypto.randomBytes(size);
};

// encodes given byte buffer into a base64 URL safe string.
const generateBase64UrlEncodedString = (bytesToEncode: Buffer): string => {
  return bytesToEncode
    .toString('base64')
    .replace(REGEX_PLUS_SIGN, '-')
    .replace(REGEX_FORWARD_SLASH, '_')
    .replace(REGEX_EQUALS_SIGN, '');
};

/*
  This function generates the state required for both the
  OAuth2.0 Authorization and Implicit grant flow
*/
export const generateClientState = () => {
  return generateBase64UrlEncodedString(generateRandomBytes());
};

export const sha256 = (buffer: string) => {
  return crypto.createHash('sha256').update(buffer).digest();
};

export const getAuthCodeRedirectURL = (
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  state: string,
  scopeList: string[]
) => {
  const scope = scopeList.join(' ');

  const loginQS = {
    client_id: clientId,
    redirect_uri: redirectUri,
    client_secret: clientSecret,
    code_challenge: state,
    code_challenge_method: 'S256',
    response_type: 'code',
    scope,
    state
  };
  const stringifyLoginQS = qs.stringify(loginQS);
  return SNAP_ACCOUNTS_LOGIN_URL + '?' + stringifyLoginQS;
};

/*
  client_id	        The client ID Snap assigned to your application when you signed up for Snap Kit, the value is a 36 character alphanumeric string.
  client_secret	    The client secret Snap assigned to your application when you signed up for Snap Kit. The value is a BASE64 URL encoded string.
  redirect_uri	    The redirect URI that you requested for your application.
  scope	            A URL safe space-delimited string of OAuth2.0 token scopes. These scope(s) were assigned to your application when you sign up for Snap Kit. These scopes handle what content your application can and cannot access.
                    As an example, if your application is assigned the OAuth2.0 scopes “https://auth.snapchat.com/oauth2/api/example.abc” and “https://auth.snapchat.com/oauth2/api/example.xyz”. Then your scope value would be: “https%3A%2F%2Fauth.snapchat.com%2Foauth2%2Fapi%2Fexample.abc%20https%3A%2F%2Fauth.snapchat.com%2Foauth2%2Fapi%2Fexample.xyz”
  response_type	    Value MUST be set to “code”.
*/
