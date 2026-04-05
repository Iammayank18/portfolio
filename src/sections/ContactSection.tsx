import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export const ContactSection = () => (
  <section id="contact" className="py-16 md:py-32 px-6">
    <div className="max-w-2xl mx-auto text-center">
      {/* Availability status */}
      <div className="inline-flex items-center gap-2 font-mono text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 mb-8 bg-white/60">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Available for frontend roles
      </div>

      <h2 className="text-3xl md:text-6xl font-sketch mb-4 md:mb-8">
        Let's Sketch Something Together
      </h2>
      <p className="text-lg md:text-2xl font-sketch text-gray-600 mb-6 md:mb-12">
        Currently open to interesting product roles and collaborations.
      </p>

      <div className="flex flex-row justify-center items-center gap-8 sm:gap-12">
        <a href="mailto:heymayank2001@gmail.com" className="group">
          <div className="p-4 md:p-6 sketch-border group-hover:bg-black group-hover:text-white transition-all">
            <Mail size={32} />
          </div>
          <p className="font-sketch mt-2">Email</p>
          {/* <p className="font-mono text-xs text-gray-400 mt-1 select-all">
            heymayank2001@gmail.com
          </p> */}
        </a>
        <a
          href="https://linkedin.com/in/iammayank18"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="p-4 md:p-6 sketch-border group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Linkedin size={32} />
          </div>
          <p className="font-sketch mt-2">LinkedIn</p>
          {/* <p className="font-mono text-xs text-gray-400 mt-1">iammayank18</p> */}
        </a>
        <a
          href="https://github.com/iammayank18"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="p-4 md:p-6 sketch-border group-hover:bg-gray-800 group-hover:text-white transition-all">
            <Github size={32} />
          </div>
          <p className="font-sketch mt-2">GitHub</p>
          {/* <p className="font-mono text-xs text-gray-400 mt-1">iammayank18</p> */}
        </a>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center gap-2 mt-10 text-gray-400 font-mono text-sm">
        <MapPin size={14} />
        <span>Jaipur, India · Remote friendly</span>
      </div>
    </div>
  </section>
);
