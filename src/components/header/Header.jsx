import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button, Drawer, Radio, Space } from "antd";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <header style={{ zIndex: 99999 }}>
      <div className="relative p-3 lg:px-8 flex justify-between items-center bg-gray-100 dark:bg-slate-800">
        <div>
          <h2 className="logo ">
            <Link to={"/"} className="dark:text-slate-100">
              Mayank
            </Link>
          </h2>
        </div>
        <div className="dark:text-white text-black">
          <ul className="hidden lg:flex lg:justify-between lg:items-center gap-7">
            <li>
              <Link
                className="dark:hover:text-white hover:text-sky-800"
                to={"about"}
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                className="dark:hover:text-white hover:text-sky-800"
                to="experience"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                className="dark:hover:text-white hover:text-sky-800"
                to="works"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                className="dark:hover:text-white hover:text-sky-800"
                to={"contact"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:hidden" onClick={showDrawer}>
          <BiMenu size={30} className="dark:text-white" />
        </div>
      </div>

      <Drawer
        title={
          <>
            <h2 className="main__logo text-3xl">Mayank</h2>
          </>
        }
        placement={"left"}
        closable={false}
        size={"small"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <AiOutlineClose onClick={onClose} />
          </Space>
        }
      >
        <div className="flex flex-col	gap-6">
          <Link to={"/"}>Home</Link>
          <Link to={"about"}>About</Link>
          <Link to={"experience"}>Experience</Link>
          <Link to={"works"}>Projects</Link>
          <Link to={"contact"}>Contact</Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
