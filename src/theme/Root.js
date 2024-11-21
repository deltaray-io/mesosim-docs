import React from 'react';
import CookieConsent from "react-cookie-consent";
import { useLocation } from '@docusaurus/router';

const Root = ({ children }) => {
  const location = useLocation();

  const hideCookieConsentPath = '/job-definition-standalone';

  const shouldHideCookieConsent = hideCookieConsentPath == location.pathname;

  return (
    <>
      {shouldHideCookieConsent ? (
        children
      ) : (
        <>
          {children}
          <CookieConsent
            location="bottom"
            buttonText="Got it!"
            declineButtonText="Reject"
            enableDeclineButton
            cookieName="userConsentCookie"
            flipButtons
            style={{
              background: "#383c44",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "auto",
            }}
            buttonStyle={{
              backgroundColor: "#fff",
              color: "black",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            declineButtonStyle={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
            expires={365}
          >
            <div style={{ maxWidth: "80%", lineHeight: "1.5" }}>
              We use cookies to enhance your experience on our website.{" "}
              <a
                href="https://deltaray.io/privacy-policy"
                style={{
                  color: "#e0f7fa",
                  textDecoration: "underline",
                  marginLeft: "5px",
                }}
              >
                Learn more
              </a>
            </div>
          </CookieConsent>
        </>
      )}
    </>
  );  
};

export default Root;
