import { defineConfig } from "vitepress";

export default defineConfig({
  title: "TaskFlow",
  description: "TaskFlow Documentation",
  base: "/task-mgmt-api/",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    siteTitle: "TaskFlow Docs",
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      { text: "Architecture", link: "/architecture" },
      { text: "API", link: "/api" },
    ],
    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "Home", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Learning Path", link: "/learning-path" },
        ],
      },
      {
        text: "Core Documentation",
        collapsed: false,
        items: [
          { text: "Architecture", link: "/architecture" },
          { text: "Data", link: "/data" },
          { text: "Services", link: "/services" },
          { text: "Operations", link: "/operations" },
          { text: "API", link: "/api" },
          { text: "Authentication & Security", link: "/auth-security" },
        ],
      },
      {
        text: "Roadmap",
        collapsed: false,
        items: [{ text: "Future Work", link: "/future-work" }],
      },
    ],

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/theonlysroy/task-mgmt-api",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} TaskFlow`,
    },
  },
});
