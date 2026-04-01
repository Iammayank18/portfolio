import { TerminalSection } from "../components/TerminalSection";

export const TerminalSectionWrapper = () => (
  <section className="py-32 px-6 bg-[#1a1a1a]">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-sketch text-white mb-12">
        Want to talk tech?
      </h2>
      <TerminalSection />
    </div>
  </section>
);
