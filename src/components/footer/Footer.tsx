import React from "react";
import CoreSocialButtons from "../CoreSocialButtons";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
const Footer = () => {
  return (
    <footer className="w-screen py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 flex justify-center items-center flex-wrap gap-4">
      <CoreSocialButtons
        icons={<LinkedInLogoIcon />}
        title="Linkedin"
        link="https://www.linkedin.com/in/iammayank18/"
      />
      <CoreSocialButtons
        icons={<GitHubLogoIcon />}
        title="Github"
        link="https://github.com/Iammayank18"
      />
      <CoreSocialButtons
        icons={<TwitterLogoIcon />}
        title="Twitter"
        link="https://x.com/Mayankt34461244"
      />
      <CoreSocialButtons
        icons={<EnvelopeClosedIcon />}
        title="Email"
        link="mailto:mayank.sanynk@gmail.com"
      />
    </footer>
  );
};

export default Footer;
