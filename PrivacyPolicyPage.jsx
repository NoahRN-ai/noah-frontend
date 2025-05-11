
    import React from 'react';
    import { ShieldCheck } from 'lucide-react';
    import { motion } from 'framer-motion';

    const PrivacyPolicyPage = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200"
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-brand-deepPurple/50 p-8 sm:p-10 rounded-xl shadow-2xl border border-brand-byzantineBlue/20 dark:border-brand-byzantineBlue/40">
            <div className="flex items-center mb-8">
              <ShieldCheck className="h-10 w-10 text-brand-emeraldGreen mr-4" />
              <h1 className="text-3xl sm:text-4xl font-serif text-brand-byzantineBlue dark:text-brand-parchmentWhite">Privacy Policy</h1>
            </div>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p className="mb-6 leading-relaxed">
              Welcome to NOAH.RN. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@noahrn.com.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">1. Information We Collect</h2>
              <p className="mb-4 leading-relaxed">
                We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application, or otherwise when you contact us.
              </p>
              <p className="leading-relaxed">
                The personal information that we collect depends on the context of your interactions with us and the application, the choices you make, and the products and features you use. The personal information we collect may include the following: names, email addresses, job titles, and other similar information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">2. How We Use Your Information</h2>
              <p className="mb-4 leading-relaxed">
                We use personal information collected via our application for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 mb-4 leading-relaxed">
                <li>To facilitate account creation and logon process.</li>
                <li>To post testimonials with your consent.</li>
                <li>To manage user accounts.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our Services (e.g., for fraud monitoring and prevention).</li>
                <li>To respond to legal requests and prevent harm.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">3. Will Your Information Be Shared With Anyone?</h2>
              <p className="mb-4 leading-relaxed">
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">4. How Long Do We Keep Your Information?</h2>
              <p className="mb-4 leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">5. How Do We Keep Your Information Safe?</h2>
              <p className="mb-4 leading-relaxed">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">6. Your Privacy Rights</h2>
              <p className="mb-4 leading-relaxed">
                In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">7. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions or comments about this notice, you may email us at privacy@noahrn.com or by post to:
                <br />
                NOAH.RN Privacy Department
                <br />
                123 Health Tech Avenue
                <br />
                Innovation City, HC 54321
                <br />
                United States
              </p>
            </section>
          </div>
        </motion.div>
      );
    };

    export default PrivacyPolicyPage;
  