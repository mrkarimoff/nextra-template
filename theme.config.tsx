import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import logo from "./assets/img/logo.svg";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: (
    <>
      <Image width="40" height="40" priority src={logo} alt="Logo" />
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>Network Canvas</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Nextra" />
      <meta property="og:description" content="The next site builder" />
      <link as="icon" rel="icon" href="./assets/favicon.png" />
    </>
  ),
  project: {
    link: "https://github.com/mrkarimoff/nextra-template",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/mrkarimoff/nextra-template",
  footer: {
    text: "Copyright © 2016-2021 Complex Data Collective.",
  },
};

export default config;
