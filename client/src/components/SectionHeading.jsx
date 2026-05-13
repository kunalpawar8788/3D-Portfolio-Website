import { motion } from "framer-motion";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="mb-10 max-w-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        data-text={title}
        className="glitch font-display text-2xl uppercase tracking-[0.07em] text-white md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-3 text-sm text-white/70 md:text-base"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionHeading;
