
    import React from 'react';
    import { FileText } from 'lucide-react';
    import { motion } from 'framer-motion';

    const TermsOfServicePage = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200"
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-brand-deepPurple/50 p-8 sm:p-10 rounded-xl shadow-2xl border border-brand-byzantineBlue/20 dark:border-brand-byzantineBlue/40">
            <div className="flex items-center mb-8">
              <FileText className="h-10 w-10 text-brand-emeraldGreen mr-4" />
              <h1 className="text-3xl sm:text-4xl font-serif text-brand-byzantineBlue dark:text-brand-parchmentWhite">Terms of Service</h1>
            </div>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p className="mb-6 leading-relaxed">
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the NOAH.RN application (the "Service") operated by NOAH.RN ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">1. Accounts</h2>
              <p className="mb-4 leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">2. Intellectual Property</h2>
              <p className="mb-4 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of NOAH.RN and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NOAH.RN.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">3. User Conduct</h2>
              <p className="mb-4 leading-relaxed">
                You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the business of NOAH.RN, or any third party. This includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 mb-4 leading-relaxed">
                <li>Harassing, abusing, or threatening others or otherwise violating any person's legal rights.</li>
                <li>Violating any intellectual property rights of NOAH.RN or any third party.</li>
                <li>Uploading or otherwise disseminating any computer viruses or other software that may damage the property of another.</li>
                <li>Engaging in or creating any unlawful gambling, sweepstakes, or pyramid scheme.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">4. Termination</h2>
              <p className="mb-4 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">5. Limitation Of Liability</h2>
              <p className="mb-4 leading-relaxed">
                In no event shall NOAH.RN, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">6. Governing Law</h2>
              <p className="mb-4 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the State of Innovation, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-3">7. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@noahrn.com.
              </p>
            </section>
          </div>
        </motion.div>
      );
    };

    export default TermsOfServicePage;
  