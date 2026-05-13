
import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";
import "./App.css"; // optional
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";


const firestore = getFirestore(app);

function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Check all required fields
    const allFilled = [...form.elements].every(
      (el) =>
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
        el.hasAttribute("required")
        ? el.value.trim() !== ""
        : true
    );

    if (!allFilled) {
      alert("Please fill all fields!");
      return;
    }

    // Extract values
    const name = form[0].value.trim();
    const mobile = form[1].value.trim();
    const email = form[2].value.trim();
    const message = form[3].value.trim();

    try {
      // Save data to Firestore
      await addDoc(collection(firestore, "users"), {
        name,
        mobile,
        email,
        message,
        timestamp: new Date()
      });

      // Show popup and reset form
      setShowPopup(true);
      form.reset();
      setTimeout(() => setShowPopup(false), 3000);

      console.log("Message saved successfully!");
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container" id="contact">
      <div className="row">
        {/* Left Section */}
        <div className="contact-left">
          <h1 className="sub-title">Contact Me</h1>
          <p><i className="fas fa-paper-plane"></i> kunalpawar8805@gmail.com</p>
          <p><i className="fas fa-phone-square-alt"></i> +91 8788272946</p>
          <a href="/images/Kunal_Pawar_ResumeLX.pdf" download className="btn btn2">Download CV</a>
          
          <div className="contact-social">
            <a href="https://linkedin.com/in/kunal-pawar-309431311" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/kunalpawar8788" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://x.com/kunalpawar8805" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/kunaal_pawaar" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>




        </div>

        {/* Right Section */}
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="text" placeholder="Mobile No" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="6" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn btn2">Submit</button>
          </form>
        </div>
      </div>

      {/* Thank You Popup */}
      {showPopup && (
        <div className="glass-popup">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully.</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
