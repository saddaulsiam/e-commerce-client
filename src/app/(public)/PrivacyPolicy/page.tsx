const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        website.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">
        Information We Collect
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="mb-2 mt-6 text-xl font-semibold">
        How We Use Your Information
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To provide customer support</li>
        <li>To monitor usage of our service</li>
      </ul>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Security</h2>
      <p className="mb-4">
        We value your trust in providing us your personal information, thus we
        strive to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at{" "}
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

export default PrivacyPolicy;
