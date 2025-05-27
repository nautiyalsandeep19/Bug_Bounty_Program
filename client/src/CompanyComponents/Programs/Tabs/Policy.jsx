import React from 'react';
import Scope from './Scope';

const Policy = () => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <>
    <div className="space-y-6 text-gray-800 ">
     <div className='flex justify-between'>
      <h1 className="text-2xl font-bold">BugBase</h1>
      <p className="text-sm text-gray-500">Last Updated on {today}</p>
     </div>

      <p className='flex text-start'>
        Welcome to our bug bounty program, where we reward those who find our mistakes before our customers do.
        Think you've found a bug? Great, we can't wait to add your name to our 'hall of fame' (or shame, depending on the severity).
      </p>

      <section>
        <h2 className="text-xl font-semibold">Disclosure Policy</h2>
        <p>We take security seriously at BugBase, and we’re committed to protecting our community...</p>
        <p>To help us address the issue as quickly as possible, please provide as much information as possible...</p>
        <p>
          Our bug bounty program is specifically for reporting potential security vulnerabilities. If you want to report a
          functional bug, need assistance with a submission, or have a general query, please visit our contact page.
        </p>
        <p>We ask that you give us a reasonable amount of time to resolve the issue before disclosing it...</p>
        <p>We're flattered that you want to test the limits of our security, but please follow the rules.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Program Rules</h2>
        <ul className="pl-6 space-y-1">
          <li>No scanners/tools – we want your creative hacking skills.</li>
          <li>Do not disclose vulnerabilities before they're fixed.</li>
          <li>Use <strong>testing.bugbase.in</strong> for POCs, not <strong>bugbase.in</strong>.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Reporting Guidelines</h2>
        <ul className=" pl-6 space-y-1">
          <li>Provide clear, detailed reports with steps to reproduce.</li>
          <li>Include screenshots or PoC code where necessary.</li>
          <li>Submit one vulnerability per report (unless chaining).</li>
          <li>Prioritize quality over quantity in your reports.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Reward Eligibility</h2>
        <ul className=" pl-6 space-y-1">
          <li>Be the first to report the vulnerability.</li>
          <li>Follow our disclosure and reporting guidelines.</li>
          <li>No violation of local/national laws.</li>
          <li>Rewards depend on severity and impact.</li>
          <li>We will NOT pay for:
            <ul className=" pl-6 mt-1 space-y-1 text-sm">
              <li>Previously known/reported vulnerabilities.</li>
              <li>Third-party disclosures before reporting to us.</li>
              <li>Employee reports (within last 3 months).</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Out-of-Scope</h2>
        <ul className=" pl-6 space-y-1">
          <li>Subdomains unless marked "in-scope".</li>
          <li>Testing/staging environments.</li>
          <li>External services unless affecting Bugbase users/PII.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Reward Exclusions</h2>
        <ul className=" pl-6 space-y-1 text-sm">
          <li>Reports only enumerating user/program handles.</li>
          <li>Spamming via automated emails (e.g., forgot password abuse).</li>
          <li>Zero-day vulns with patches older than 1 month.</li>
          <li>No PoC for known vulnerable libraries.</li>
          <li>Subdomain takeovers not actually executed.</li>
          <li>Information disclosure without impact.</li>
          <li>Content spoofing, self-XSS, clickjacking without sensitive action.</li>
          <li>CSRF with no real exploitation scenario.</li>
          <li>MITM attacks, physical access, etc.</li>
          <li>Best practice issues like missing CSP, Secure flags, etc.</li>
          <li>Version/banner info, descriptive error messages.</li>
          <li>Open redirects without impact.</li>
          <li>Tab nabbing, CSV injection without vulnerability.</li>
          <li>Issues affecting outdated browsers.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Safe Harbour</h2>
        <p>
          Bugbase will not pursue legal action against individuals who accidentally and in good faith violate our policies.
        </p>
        <p>
          If legal action is taken against you by a third party, we will make it known that your actions were ethical and
          with our approval.
        </p>
        <p className="font-semibold">The bugs are out there, and we're counting on you to track them down. Let the hunt commence!</p>
      </section>
    </div>
    <Scope/>
    </>
  );
};

export default Policy;
