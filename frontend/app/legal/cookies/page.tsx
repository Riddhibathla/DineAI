import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookie Policy | DINE AI" };

export default function CookiePolicy() {
  return (
    <LegalPage
      eyebrow="A short, honest cookie menu"
      title="Cookie Policy"
      summary="DINE AI currently uses only the browser technologies needed to keep accounts secure and core features working."
    >
      <section>
        <h2>1. What cookies are</h2>
        <p>Cookies are small pieces of information stored by a website in your browser. Similar technologies, such as local storage, can remember information on your device without sending it with every request.</p>
      </section>
      <section>
        <h2>2. What DINE AI uses</h2>
        <div className="legal-table" role="table" aria-label="Storage technologies">
          <div role="row"><b role="columnheader">Purpose</b><b role="columnheader">Technology</b><b role="columnheader">Duration</b></div>
          <div role="row"><span>Secure Supabase authentication session</span><span>Essential cookies</span><span>Session or provider-defined</span></div>
          <div role="row"><span>Remember that you saw the cookie notice</span><span>Local storage</span><span>Until site data is cleared</span></div>
          <div role="row"><span>Keep demo orders, waitlist entries, and interface state on your device</span><span>Local storage</span><span>Until site data is cleared</span></div>
        </div>
      </section>
      <section>
        <h2>3. Third-party authentication</h2>
        <p>If you choose Google sign-in, Google and Supabase may set cookies needed to complete authentication, prevent fraud, and maintain your session. Their use is governed by their respective policies.</p>
      </section>
      <section>
        <h2>4. No advertising cookies</h2>
        <p>DINE AI does not currently use advertising cookies, cross-site behavioral tracking, or third-party analytics cookies. If that changes, this policy and the consent experience will be updated before optional tracking is enabled.</p>
      </section>
      <section>
        <h2>5. Managing storage</h2>
        <p>You can block or delete cookies and local storage through your browser settings. Blocking essential authentication cookies may prevent sign-in, and clearing local storage may remove locally saved demo activity.</p>
      </section>
      <section>
        <h2>6. Contact</h2>
        <p>Questions about cookies can be sent to <a href="mailto:dineai.auth@gmail.com">dineai.auth@gmail.com</a>.</p>
      </section>
    </LegalPage>
  );
}
