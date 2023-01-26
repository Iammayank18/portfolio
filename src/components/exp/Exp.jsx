import React from "react";
import { BsPatchCheckFill, BsCheck, BsCheckLg } from "react-icons/bs";
import "./Exp.css";

let arr2 = [
  {
    company: "Mindnerves technologies services pvt.ltd",
    pos: "Software Engineer (Frontend)",
    time: "July 2022 - current",
    role: [
      "Development of interactive UI elements, Creation of seprate reusable components that improve performance and decrease code.",
      "Integraton of Api's and Business logic.",
      "Testing and debugging.",
    ],
    accomp: [
      "Develop new UI functionality for multithreaded user-facing applications running on web and mobile.",
      "Designed reusable and reliable components that decreased unwanted lines of code.",
      "Developed clear specifications for project plans using customer requirements , collaborate with designing team for layout specifications.",
    ],
    tech: ["React.js", "React Native", "Javscript", "Html", "Tailwind css"],
  },
  {
    company: "Meon AI",
    pos: "Frontend developer",
    time: "Dec 2021 - June 2022",
    role: [
      "Converting figma and other designs into Responsive websites.",
      "Integraton of Api's and Business logic.",
      "Testing and debugging and maintaining the application",
    ],
    accomp: [
      "Building and maintaining user interfaces using technologies such as HTML, CSS, and JavaScript.",
      "DCreating and implementing responsive designs that adapt to different screen sizes and devices.",
      "Integrating with back-end services and APIs to display and manipulate data",
      "Optimizing the performance and load times of web pages , Ensuring cross-browser compatibility and accessibility.",
    ],
    tech: ["React.js", "jQuery", "Javscript", "Html", "Css", "Bootstrap"],
  },
  {
    company: "Exponus Media",
    pos: "Frontend developer",
    time: "Jan 2021 - Oct 2021",
    role: [
      "Converting figma and other designs into Responsive websites.",
      "Integraton of Api's and Business logic..",
      "Development and maintenance of APi's.",
      "Testing and debugging and maintaining the application",
    ],
    accomp: [
      "Designing and building user interfaces using technologies such as HTML, CSS, and JavaScript.",
      "Building and maintaining back-end systems and APIs using technologies such as Node.js, and PHP.",
      "Implementing and maintaining security measures to protect against data breaches and other security threats.",
      "Optimizing the performance and scalability of web applications.",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Php",
      "Bootstrap",
      "Sql",
      "MongoDB",
      "jQuery",
      "Javscript",
      "Html",
    ],
  },
];

var myArray = [
  "red",
  "yellow",
  "pink",
  "green",
  "sky",
  "red",
  "green",
  "lime",
  "amber",
  "orange",
];
let randColor = myArray[Math.floor(Math.random() * myArray.length)];
const Exp = () => {
  return (
    <section id="" className="h-screen">
      <h5 className="text-4xl dark:text-white text-gray-500 main__logo">
        What Skills I Have
      </h5>
      <h2>My Experience</h2>

      <div>
        {arr2.map((item, i) => {
          console.log(item);
          return (
            <div
              key={i}
              className="relative dark:bg-slate-700 bg-slate-100 mx-auto md:w-3/6 w-5/6 p-10 mb-5 rounded-lg z-10 border-l-4 border-cyan-500"
            >
              <div className="flex justify-between">
                <h3 className="text-slate-700 dark:text-slate-50 text-3xl">
                  {item.pos}
                </h3>
                <p className="dark:text-slate-400">{item.time}</p>
              </div>
              <div className="pt-1 pb-4">
                <p className="text-[#6363cc] dark:text-cyan-400	">
                  {item.company}
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-3 dark:text-slate-300">Role</h3>
                <div className="text-slate-400 text-base dark:text-slate-300 leading-relaxed">
                  {item.role.map((data, i) => (
                    <div key={i} className="flex  gap-5 items-center mb-2">
                      <BsCheckLg
                        size={17}
                        className="text-slate-700 dark:text-slate-300"
                      />
                      <p>{data}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl mb-3 dark:text-slate-300">
                  Accomplishments
                </h3>
                <div className="text-slate-400 text-base  dark:text-slate-300   leading-relaxed">
                  {item.accomp.map((data, i) => (
                    <div key={i} className="flex gap-5 items-center mb-3">
                      <BsCheckLg
                        size={17}
                        className="text-slate-700 dark:text-slate-300"
                      />
                      <p>{data}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl mb-3 dark:text-slate-300">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {item.tech.map((data, i) => {
                    console.log(randColor);
                    return (
                      <span
                        key={i}
                        className={`bg-${randColor}-200 text-sky-600	p-2 px-5 border-1 rounded-3xl`}
                      >
                        {data}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Exp;
