import React from "react";

type Props = {
  icons?: React.ReactElement;
  title?: string;
  link?: string;
};
const CoreSocialButtons: React.FC<Props> = ({ icons, title, link }) => {
  return (
    <a
      target="_blank"
      href={link}
      className="flex items-center gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900"
    >
      {icons}
      {title}
    </a>
  );
};

export default CoreSocialButtons;
