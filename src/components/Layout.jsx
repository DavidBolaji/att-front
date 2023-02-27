import { Puff, Dna, Audio } from "react-loader-spinner";

import React from "react";
const Layout = () => {
  return (
    // <Puff
    //   type="puff"
    //   color="#00BFFF"
    //   height={100}
    //   width={100}
    //   timeout={3000} // optional: specify how long to wait before showing the preloader
    // />
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
    // <Audio
    //   height="80"
    //   width="80"
    //   radius="9"
    //   color="green"
    //   ariaLabel="loading"
    //   wrapperStyle
    //   wrapperClass
    // />
  );
};

export default Layout;
