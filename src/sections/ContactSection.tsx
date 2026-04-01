import { Mail, Linkedin, Github } from "lucide-react";

export const ContactSection = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-6xl font-sketch mb-8">
        Let's Sketch Something Together
      </h2>
      <p className="text-2xl font-sketch text-gray-600 mb-12">
        Currently open to interesting product roles and collaborations.
      </p>
      <div className="flex justify-center gap-12">
        <a href="mailto:abhinavthakur958@gmail.com" className="group">
          <div className="p-6 sketch-border group-hover:bg-black group-hover:text-white transition-all">
            <Mail size={32} />
          </div>
          <p className="font-sketch mt-2">Email</p>
        </a>
        <a
          href="https://linkedin.com/in/iammayank18"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="p-6 sketch-border group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Linkedin size={32} />
          </div>
          <p className="font-sketch mt-2">LinkedIn</p>
        </a>
        <a
          href="https://github.com/iammayank18"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="p-6 sketch-border group-hover:bg-gray-800 group-hover:text-white transition-all">
            <Github size={32} />
          </div>
          <p className="font-sketch mt-2">GitHub</p>
        </a>
      </div>
    </div>
  </section>
);
