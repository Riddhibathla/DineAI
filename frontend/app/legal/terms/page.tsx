import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms & Conditions | DINE AI" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The rules of the table"
      title="Terms & Conditions"
      summary="These terms govern access to the DINE AI demonstration and its guest and restaurant-management experiences."
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>By accessing or using DINE AI, you agree to these terms and the Privacy and Cookie Policies. If you do not agree, do not use the service.</p>
      </section>
      <section>
        <h2>2. Hackathon demonstration</h2>
        <p>DINE AI is currently a demonstration product. Menu availability, wait times, prices, inventory, analytics, payments, and operational recommendations may use sample data and must not be treated as binding restaurant information.</p>
      </section>
      <section>
        <h2>3. Accounts and access</h2>
        <p>You are responsible for maintaining the security of your account and for activity performed through it. Restaurant-management access is restricted to authorized users. You must not attempt to bypass permissions, access another user’s account, or interfere with the service.</p>
      </section>
      <section>
        <h2>4. Acceptable use</h2>
        <ul>
          <li>Provide accurate information and use the service lawfully.</li>
          <li>Do not upload malicious content, automate abusive requests, or probe for vulnerabilities.</li>
          <li>Do not copy, resell, or misrepresent the service without permission.</li>
          <li>Do not use DINE AI to make emergency, medical, or safety-critical decisions.</li>
        </ul>
      </section>
      <section>
        <h2>5. Allergies, orders, and payments</h2>
        <p>DINE AI can help communicate dietary context, but restaurants and guests remain responsible for confirming ingredients, preparation practices, and allergy safety. Demonstration orders and payment displays may not create a real purchase or reservation.</p>
      </section>
      <section>
        <h2>6. Availability and changes</h2>
        <p>The service may be changed, suspended, or discontinued, and features may be unavailable or contain errors. We may update these terms as the product develops.</p>
      </section>
      <section>
        <h2>7. Disclaimers and liability</h2>
        <p>To the extent permitted by law, DINE AI is provided “as is” without warranties of uninterrupted operation, accuracy, merchantability, fitness for a particular purpose, or non-infringement. We are not liable for indirect or consequential loss arising from use of the demonstration.</p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:dineai.auth@gmail.com">dineai.auth@gmail.com</a>.</p>
      </section>
    </LegalPage>
  );
}
