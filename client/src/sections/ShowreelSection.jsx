import { motion } from "framer-motion";

import GlobeScene from "../components/GlobeScene";
import SectionHeading from "../components/SectionHeading";

const ShowreelSection = () => {
  return (
    <section id="showreel" className="section-fade relative overflow-hidden px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Connecting Across the Globe"
          subtitle="Direct globe view without a frame, so it matches your reference style and feels integrated with the page."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative">
            <GlobeScene className="h-[300px] sm:h-[380px] md:h-[560px]" />

            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-xl text-white">Drag to rotate</p>
                <p className="mt-1 text-sm text-white/65">Globe is now shown directly on section background, not inside a frame.</p>
              </div>
              <div className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100">
                Move the globe
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
