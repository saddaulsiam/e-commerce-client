import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to Siam Store. By accessing or using our website, you agree to
        be bound by these Terms and Conditions. Please read them carefully.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">1. Use of the Site</h2>
      <p className="mb-4">
        You agree to use this site only for lawful purposes and in a way that
        does not infringe the rights of, restrict, or inhibit anyone else&apos;s
        use of the site.
        <br />
        <br />
        Prohibited behavior includes harassing or causing distress or
        inconvenience to any other user, transmitting obscene or offensive
        content, or disrupting the normal flow of dialogue within the site.
        <br />
        <br />
        You must not misuse the website by knowingly introducing viruses,
        trojans, worms, logic bombs, or other material that is malicious or
        technologically harmful.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">
        2. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on this site, including text, graphics, logos, images, and
        software, is the property of Siam Store or its content suppliers and is
        protected by copyright laws.
        <br />
        <br />
        You may not reproduce, duplicate, copy, sell, resell, or exploit any
        portion of the site without express written permission from us.
        <br />
        <br />
        Any unauthorized use terminates the permission or license granted by
        Siam Store.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">3. User Accounts</h2>
      <p className="mb-4">
        To access certain features, you may be required to create an account.
        You are responsible for maintaining the confidentiality of your account
        and password and for restricting access to your computer.
        <br />
        <br />
        You agree to accept responsibility for all activities that occur under
        your account or password.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">
        4. Product Information
      </h2>
      <p className="mb-4">
        We strive to ensure that all details, descriptions, and prices of
        products appearing on this website are accurate. However, errors may
        occur. If we discover an error in the price or description of any goods
        you have ordered, we will inform you as soon as possible.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        Siam Store will not be liable for any damages arising from the use of
        this site or from any information, content, materials, or products
        included on or otherwise made available to you through this site.
        <br />
        <br />
        This includes, but is not limited to, direct, indirect, incidental,
        punitive, and consequential damages.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">6. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these terms at any time. Changes will be
        posted on this page and your continued use of the site signifies your
        acceptance of any updated terms.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">7. Governing Law</h2>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance
        with the laws of your jurisdiction. Any disputes relating to these terms
        and conditions will be subject to the exclusive jurisdiction of the
        courts of that jurisdiction.
      </p>

      <h2 className="mb-2 mt-6 text-xl font-semibold">8. Contact Us</h2>
      <p>
        If you have any questions about these Terms and Conditions, please
        contact us at{" "}
        <a
          href="mailto:support@siamstore.com"
          className="text-blue-600 underline"
        >
          support@siamstore.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;
