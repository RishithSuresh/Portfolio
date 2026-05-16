import { useState } from 'react';

const services = [
  'Search Engine Optimization',
  'Pay-Per-Click Advertising',
  'Social Media Marketing',
  'Email Marketing',
  'Content Creation',
  'Analytics and Tracking',
];

const caseStudies = [
  'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic.',
  'For a B2B software company, we developed an SEO strategy that doubled their organic traffic in six months.',
  'For a national retail chain, we increased social media engagement by 400% and generated 2,000+ leads.',
];

const processSteps = [
  'Consultation',
  'Research and Strategy Development',
  'Implementation',
  'Monitoring and Optimization',
  'Reporting and Communication',
  'Continual Improvement',
];

const team = ['John Smith', 'Jane Doe', 'Michael Brown', 'Emily Johnson', 'Brian Williams', 'Sarah Kim'];

export default function App() {
  const [openStep, setOpenStep] = useState(0);

  return (
    <div className="page">
      <header className="topbar container">
        <div className="brand">★ Positivus</div>
        <nav className="nav">
          <a href="#about">About us</a>
          <a href="#services">Services</a>
          <a href="#cases">Use Cases</a>
          <a href="#pricing">Pricing</a>
          <a href="#blog">Blog</a>
        </nav>
        <button className="btn btn-outline">Request a quote</button>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <h1>Navigating the digital landscape for success</h1>
            <p>
              Our digital marketing agency helps businesses grow and succeed online through search, content, and
              conversion-focused experiences.
            </p>
            <button className="btn btn-dark">Book a consultation</button>
          </div>
          <div className="hero-visual">
            <div className="cube-placeholder">Interactive 3D Cube</div>
          </div>
        </section>

        <section className="logo-row">
          <span>amazon</span>
          <span>dribbble</span>
          <span>HubSpot</span>
          <span>Notion</span>
          <span>NETFLIX</span>
          <span>zoom</span>
        </section>

        <section id="services">
          <h2 className="section-title">Services</h2>
          <div className="service-grid">
            {services.map((item, index) => (
              <article className={`service-card ${index % 2 ? 'lime' : 'light'} ${index % 3 === 2 ? 'dark' : ''}`} key={item}>
                <h3>{item}</h3>
                <a href="#services">Learn more →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <h3>Let&apos;s make things happen</h3>
            <p>Contact us today to learn how we can help your business grow and succeed online.</p>
          </div>
          <button className="btn btn-dark">Get your free proposal</button>
        </section>

        <section id="cases">
          <h2 className="section-title">Case Studies</h2>
          <div className="case-grid">
            {caseStudies.map((study) => (
              <article className="case-card" key={study}>
                <p>{study}</p>
                <a href="#cases">Learn more ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Our Working Process</h2>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <button
                className={`process-item ${openStep === index ? 'open' : ''}`}
                key={step}
                onClick={() => setOpenStep(index)}
                type="button"
              >
                <div className="process-head">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <span>{step}</span>
                  <span>{openStep === index ? '−' : '+'}</span>
                </div>
                {openStep === index && <p>We tailor this stage to your business goals and measurable KPIs.</p>}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Team</h2>
          <div className="team-grid">
            {team.map((name) => (
              <article className="team-card" key={name}>
                <div className="avatar" />
                <h3>{name}</h3>
                <p>Specialist</p>
              </article>
            ))}
          </div>
          <div className="team-action">
            <button className="btn btn-dark">See all team</button>
          </div>
        </section>

        <section>
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonial">
            <p>
              “We have seen a significant increase in website traffic and leads since working together. The strategy
              is clear, effective, and data-driven.”
            </p>
            <div className="dots">• • • • •</div>
          </div>
        </section>

        <section className="contact">
          <div className="contact-form">
            <h2 className="section-title">Contact Us</h2>
            <input placeholder="Name" />
            <input placeholder="Email" type="email" />
            <textarea placeholder="Message" rows={5} />
            <button className="btn btn-dark">Send Message</button>
          </div>
          <div className="contact-art" />
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <h3>★ Positivus</h3>
            <p>contact@positivus.com</p>
            <p>+1 (555) 567-8901</p>
          </div>
          <div className="newsletter">
            <input placeholder="Email" type="email" />
            <button className="btn btn-lime">Subscribe to news</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
