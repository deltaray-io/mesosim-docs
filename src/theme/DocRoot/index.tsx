import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import type DocRootType from '@theme/DocRoot';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import CookieConsent from "react-cookie-consent";
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof DocRootType>;

//NOTE: Wrapper for DocRoot that adds a cookie consent banner to every page, except for specific paths like "/job-definition-standalone".
export default function DocRootWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideCookieConsentPath = '/job-definition-standalone';

  const shouldHideCookieConsent = normalizePath(hideCookieConsentPath) === normalizePath(location.pathname);

  return (
    <>
      {shouldHideCookieConsent ? (
        <DocRoot {...props} />
      ) : (
        <>
          <DocRoot {...props} />
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
                href="https://deltaray.io/cookie-policy"
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
}
