import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy | DINE AI" };

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Privacy, without the fine-print fog"
      title="Privacy Policy"
      summary="This policy explains what DINE AI handles, why it is needed, and the choices available to you."
    >
      <section>
        <h2>1. Information we collect</h2>
        <p>When you create an account, we receive your email address and authentication details from Supabase or Google. We may also process information you choose to provide, including your name, dining preferences, dietary notes, waitlist details, orders, and service requests.</p>
        <p>We also receive limited technical information necessary to operate and secure the service, such as browser type, device information, IP address, authentication events, and error logs.</p>
      </section>
      <section>
        <h2>2. How we use information</h2>
        <ul>
          <li>Provide account access and maintain authenticated sessions.</li>
          <li>Deliver guest ordering and restaurant-management features.</li>
          <li>Carry dietary and allergen context through the dining workflow.</li>
          <li>Protect the service, prevent misuse, and troubleshoot failures.</li>
          <li>Improve usability and reliability based on aggregate feedback.</li>
        </ul>
      </section>
      <section>
        <h2>3. Service providers</h2>
        <p>DINE AI uses Supabase for authentication and related account infrastructure, Google when you choose Google sign-in, Render for application hosting, and an SMTP provider for transactional account emails. These providers process information under their own terms and privacy policies.</p>
      </section>
      <section>
        <h2>4. Storage and retention</h2>
        <p>Authentication records remain in Supabase while your account is active or as needed for security and legal purposes. Some demo ordering and operational data may be stored in your browser’s local storage and remains on that device until you clear site data. DINE AI does not sell personal information.</p>
      </section>
      <section>
        <h2>5. Your choices</h2>
        <p>You may request access, correction, or deletion of your account information. You can clear device-stored information through your browser settings and disconnect Google access from your Google Account.</p>
      </section>
      <section>
        <h2>6. Dietary and sensitive information</h2>
        <p>Dietary and allergen notes are used to support restaurant communication, but DINE AI is not a medical service. Always communicate serious allergies directly to restaurant staff. Avoid entering information that is not necessary for your dining request.</p>
      </section>
      <section>
        <h2>7. Children</h2>
        <p>DINE AI is not directed to children under 13. A parent or guardian should supervise use by minors where required by local law.</p>
      </section>
      <section>
        <h2>8. Contact and changes</h2>
        <p>Questions or privacy requests can be sent to <a href="mailto:dineai.auth@gmail.com">dineai.auth@gmail.com</a>. We may update this policy as the service changes and will revise the date shown above.</p>
      </section>
    </LegalPage>
  );
}
