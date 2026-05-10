import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — YouGO",
    description: "How YouGO collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-white font-sans">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 pb-8 border-b border-gray-100">
                    <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">Legal</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-4">Privacy Policy</h1>
                    <p className="text-gray-400 text-sm">Last updated: May 10, 2026</p>
                </div>

                <div className="space-y-10 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">1. Introduction</h2>
                        <p>Welcome to YouGO. We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">2. Data We Collect</h2>
                        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you, grouped as follows:</p>
                        <ul className="space-y-2 pl-5 list-disc marker:text-[#8CB45C]">
                            <li><strong>Identity Data</strong> — first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> — email address and telephone numbers.</li>
                            <li><strong>Technical Data</strong> — IP address, browser type and version, time zone setting and location.</li>
                            <li><strong>Usage Data</strong> — information about how you use our website, products and services.</li>
                            <li><strong>Profile Data</strong> — your travel preferences, vibe, and trip history.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">3. How We Use Your Data</h2>
                        <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use it to:</p>
                        <ul className="space-y-2 pl-5 list-disc marker:text-[#8CB45C]">
                            <li>Perform the contract we are entering into or have entered into with you (e.g., booking a trip).</li>
                            <li>Provide AI-powered travel recommendations personalized to your preferences.</li>
                            <li>Match you with compatible travel partners based on your profile.</li>
                            <li>Notify you of relevant trips, community stories, and platform updates.</li>
                            <li>Comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">4. Data Security</h2>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those with a legitimate business need.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">5. Data Retention</h2>
                        <p>We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for. You may request deletion of your account and associated data at any time by contacting us.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">6. Your Rights</h2>
                        <p className="mb-4">You have the right to request access, correction, erasure, or restriction of your personal data. You also have the right to object to processing and to data portability.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0d2b2b] mb-3">7. Contact Us</h2>
                        <p>
                            For any questions about this privacy policy, contact us at{" "}
                            <a href="mailto:privacy@yougo.world" className="text-[#8CB45C] font-semibold hover:underline">
                                privacy@yougo.world
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
