import React from "react";
import { userActions } from '../../../redux/reducers/user';

const GoogleLogin = ({ setUserData, loggedIn, givenName }) => {

    window.Google_signIn = async (response) => {
        setUserData(decodeJwtResponse(response.credential));
    }

    function decodeJwtResponse(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    const scriptRef = React.useRef(null);
    React.useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        if (scriptRef.current) {
            scriptRef.current.appendChild(script);
        }

        return () => {
            scriptRef.current?.removeChild(script);
        };
    }, [scriptRef]);

    return (
        <div>
            { loggedIn && `Hi, ${givenName}!` }
            { !loggedIn &&
                <>
                    <div ref={scriptRef}></div>

                    <div id="g_id_onload"
                         data-client_id={process.env.REACT_APP_GOOGLE_AUTH_KEY}
                         data-context="signin"
                         data-ux_mode="popup"
                         data-callback="Google_signIn"
                         data-auto_prompt="false">
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="g_id_signin"
                            data-type="standard"
                            data-size="large"
                            data-theme="outline"
                            data-text="continue_with"
                            data-shape="rectangular"
                            data-logo_alignment="center"
                        ></div>
                    </div>
                </>
            }
        </div>
    );
};

export default GoogleLogin;