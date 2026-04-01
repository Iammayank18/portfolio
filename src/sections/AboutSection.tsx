import { SkillTag } from "../components/SkillTag";
import { StickyNote } from "../components/StickyNote";
import { ABOUT_SKILLS } from "../data";
import { useAboutAnimations } from "../hooks/useAboutAnimations";

export const AboutSection = ({ isBooting }: { isBooting: boolean }) => {
  useAboutAnimations(isBooting);

  return (
    <section
      id="about"
      className="py-32 px-6 max-w-6xl mx-auto about-section relative"
    >
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Left Column: The Narrative */}
        <div className="md:col-span-7 about-content">
          <div className="relative inline-block mb-8">
            <h2 className="text-6xl font-sketch">The Story</h2>
          </div>

          <div className="space-y-6 font-sketch text-xl leading-relaxed text-gray-700">
            <p>
              It all started with a{" "}
              <span className="bg-yellow-100 px-1">
                curiosity for how things work
              </span>
              . Before I was writing React components, I was sketching interfaces
              on the back of my notebooks. I've always believed that the best
              products are built at the intersection of{" "}
              <span className="italic underline decoration-blue-400 decoration-2 underline-offset-4">
                logic and empathy
              </span>
              .
            </p>

            <p>
              As a frontend engineer, I don't just "implement designs." I think
              about the <span className="font-bold">micro-interactions</span>, the
              performance edge cases, and the emotional response of the user.
              Whether it's building a complex inspection tool or a simple booking
              flow, my goal is always the same:
              <span className="sketch-underline">Make it feel effortless.</span>
            </p>

            <div className="pt-8">
              <h3 className="text-2xl mb-6 text-black underline decoration-dashed underline-offset-8">
                Tools in my kit:
              </h3>
              <div className="flex flex-wrap gap-4">
                {ABOUT_SKILLS.map((skill) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    details={skill.details}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Margin Notes */}
        <div className="md:col-span-5 space-y-12">
          <div className="relative about-image">
            <div className="sketch-border p-4 rotate-3 bg-white shadow-xl relative z-10">
              <img
                src="https://picsum.photos/seed/mayank/500/600"
                alt="Mayank"
                className="w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-sm"
                referrerPolicy="no-referrer"
              />
              <p className="font-sketch text-center mt-4 text-xl">
                "Probably thinking about state management"
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-black/10 rounded-full flex items-center justify-center rotate-12" />
          </div>

          <div className="-rotate-2 ml-4 story-note">
            <StickyNote color="bg-yellow-50">
              <h4 className="font-sketch text-2xl mb-3 underline decoration-wavy decoration-yellow-400">
                Quick Facts
              </h4>
              <ul className="font-sketch text-lg space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Obsessed with typography
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Loves React Native internals
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Can spend hours on animations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Coffee-to-code converter ☕
                </li>
              </ul>
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
};
