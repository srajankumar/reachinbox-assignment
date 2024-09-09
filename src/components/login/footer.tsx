import React from "react";

const Footer = () => {
  return (
    <div className="fixed bg-card bottom-0 py-5 border-t w-full flex justify-center">
      © {new Date().getFullYear()} Reachinbox. All rights reserved.
    </div>
  );
};

export default Footer;
