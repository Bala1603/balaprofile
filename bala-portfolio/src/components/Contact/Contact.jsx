import "./Contact.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHome,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

function Contact() {
  const sendWhatsApp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const text =
`Hello Bala,

Name: ${name}
Email: ${email}

${message}`;

    window.open(
      `https://wa.me/919597808123?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    e.target.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-heading">
          <p className="contact-label">Get In Touch</p>

          <h2>
            Contact <span>Me</span>
          </h2>

          <div className="contact-line"></div>

          <p className="contact-intro">
            Interested in collaborating, discussing a project, or simply
            connecting? Feel free to reach out. I'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="contact-grid">

          {/* Left */}

          <div className="contact-info">

            <div className="contact-card">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>bala161200@gmail.com</p>
              </div>
            </div>

            <div className="contact-card">
              <FaPhoneAlt />
              <div>
                <h4>Phone</h4>
                <p>+91 9597808123</p>
              </div>
            </div>

            <div className="contact-card">
              <FaMapMarkerAlt />
              <div>
                <h4>Current Location</h4>
                <p>Chennai</p>
              </div>
            </div>

            <div className="contact-card">
              <FaHome />
              <div>
                <h4>Native Location</h4>
                <p>Tirunelveli</p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/baladata/"
              target="_blank"
              rel="noreferrer"
              className="social-contact"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="https://github.com/Bala1603"
              target="_blank"
              rel="noreferrer"
              className="social-contact"
            >
              <FaGithub />
              GitHub
            </a>

          </div>

          {/* Right */}

          <form className="contact-form" onSubmit={sendWhatsApp}>

            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
            />

            <textarea
              rows="8"
              placeholder="Write your message..."
              name="message"
              required
            ></textarea>

            <button type="submit">
              <FaWhatsapp />
              Send via WhatsApp
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;