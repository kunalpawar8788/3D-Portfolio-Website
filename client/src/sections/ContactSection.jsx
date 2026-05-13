import { motion } from "framer-motion";
import { useState, useRef } from "react";
import ConfettiBlast from "../components/ConfettiBlast";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload, FiMail, FiPhone, FiSend } from "react-icons/fi";

import { submitContactToFirestore } from "../utils/api";

const initialForm = {
  name: "",
  email: "",
  subject: "Project / Freelance Inquiry",
  message: "",
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confetti, setConfetti] = useState(null);
  const submitRef = useRef(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return "Please complete all fields.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      return "Message should be at least 10 characters.";
    }

    return "";
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ type: "", message: "" });
      await submitContactToFirestore({
        name: formData.name,
        email: formData.email,
        message: `[${formData.subject}] ${formData.message}`,
      });
      setStatus({ type: "success", message: "Message sent successfully." });
      setFormData(initialForm);
      // Trigger confetti near submit button
      try {
        const rect = submitRef.current && submitRef.current.getBoundingClientRect();
        if (rect) {
          setConfetti({ x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
        } else {
          setConfetti({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        }
      } catch (e) {
        setConfetti({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to submit message." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-fade contact-grid relative overflow-hidden px-6 py-18 pb-22 md:px-12 lg:px-20">
      {/* Bright radial gradients for section lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(47,230,122,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(198,222,69,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(77,255,129,0.1),transparent_60%)] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4.8vw,4rem)] font-bold text-white">
            Get in <span className="bg-gradient-to-r from-[#2fe67a] to-[#c6de45] bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2fe67a]/40 bg-[#2fe67a]/10 px-4 py-2 text-sm font-semibold text-[#6bffa0]">
            <span className="h-2 w-2 rounded-full bg-[#2fe67a]" />
            Open to Opportunities
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 md:text-xl">
            Let&apos;s discuss your next project, career opportunity, or just say hi
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]"
        >
          <form onSubmit={onSubmit} className="space-y-4 pb-8 md:pb-12">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-white/95">
                Name <span className="text-red-400">*</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                   className="mt-2 w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-[#4dff81]/90 focus:shadow-[0_0_20px_rgba(77,255,129,0.35)]"
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm font-semibold text-white/95">
                Email <span className="text-red-400">*</span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                   className="mt-2 w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-[#4dff81]/90 focus:shadow-[0_0_20px_rgba(77,255,129,0.35)]"
                  placeholder="Your email"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-white/95">
              What's this regarding?
              <select
                name="subject"
                value={formData.subject}
                onChange={onChange}
                 className="mt-2 w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-[#4dff81]/90 focus:shadow-[0_0_20px_rgba(77,255,129,0.35)]"
              >
                <option value="Project / Freelance Inquiry">Project / Freelance Inquiry</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Collaboration">Collaboration</option>
                <option value="General Question">General Question</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-white/95">
              Message <span className="text-red-400">*</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={onChange}
                rows={5}
                 className="mt-2 w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-[#4dff81]/90 focus:shadow-[0_0_20px_rgba(77,255,129,0.35)]"
                placeholder="Tell me about your project, idea, or just ask me anything..."
              />
            </label>

            {status.message && (
              <p className={`text-sm ${status.type === "error" ? "text-red-300" : "text-[#73ff9f]"}`}>
                {status.message}
              </p>
            )}

            <button
              disabled={submitting}
              ref={submitRef}
              onClick={() => {
                try {
                  const rect = submitRef.current && submitRef.current.getBoundingClientRect();
                  if (rect) setConfetti({ x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
                } catch (e) {
                  setConfetti({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
                }
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2fd36d] to-[#d9ce3d] px-6 py-3.5 text-[1.6rem] font-semibold text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 md:text-3xl"
              type="submit"
            >
              <FiSend className="text-xl md:text-2xl" />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="space-y-4">
            <div>
              <p className="mb-3 text-4xl font-display font-semibold text-white md:text-5xl">Find me on</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://github.com/kunalpawar8788"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/25 bg-transparent px-4 py-4 text-white transition hover:border-[#4dff81]/70 hover:shadow-[0_0_20px_rgba(77,255,129,0.2)]"
                >
                  <FaGithub className="text-lg" />
                  <span className="font-semibold">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/kunal-pawar-309431311/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/25 bg-transparent px-4 py-4 text-white transition hover:border-[#4dff81]/70 hover:shadow-[0_0_20px_rgba(77,255,129,0.2)]"
                >
                  <FaLinkedinIn className="text-lg" />
                  <span className="font-semibold">LinkedIn</span>
                </a>
                <a
                  href="mailto:kunalpawar8805@gmail.com"
                  className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-white/30 bg-transparent px-4 py-4 text-white transition hover:border-[#4dff81]/80 hover:shadow-[0_0_25px_rgba(77,255,129,0.35)]"
                >
                  <FiMail className="text-lg" />
                  <span className="font-semibold">Email</span>
                </a>
                <a
                  href="tel:+918788272946"
                  className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-white/30 bg-transparent px-4 py-4 text-white transition hover:border-[#4dff81]/80 hover:shadow-[0_0_25px_rgba(77,255,129,0.35)]"
                >
                  <FiPhone className="text-lg" />
                  <span className="font-semibold">+91 8788272946</span>
                </a>
              </div>
            </div>

            <div className="mb-8 rounded-2xl border border-white/30 bg-transparent px-6 pt-6 pb-3 shadow-[0_0_40px_rgba(47,230,122,0.15)] md:mb-0">
              <p className="font-display text-3xl font-semibold text-white md:text-4xl">Download Resume</p>
              <p className="mt-2 text-white/75">
                Get a copy of my latest resume with all my experience and skills.
              </p>
              <a
                href="/Kunal_Pawar_Resume.pdf"
                download="Kunal_Pawar_Resume.pdf"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#2fe67a]/50 bg-[#2fe67a]/10 px-5 py-2.5 font-semibold text-[#6bffa0] transition hover:bg-[#2fe67a]/20"
              >
                <FiDownload />
                Download CV
              </a>
            </div>
          </div>
        </motion.div>
        {confetti && (
          <ConfettiBlast x={confetti.x} y={confetti.y} onComplete={() => setConfetti(null)} />
        )}
      </div>
    </section>
  );
};

export default ContactSection;
