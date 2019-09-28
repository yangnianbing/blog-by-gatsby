[![Netlify Status](https://api.netlify.com/api/v1/badges/89b8cdfb-af7f-48d5-863f-64fbbdfe8986/deploy-status)](https://app.netlify.com/sites/gb-template/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Maintainability](https://api.codeclimate.com/v1/badges/b23277cf6232a88f59ec/maintainability)](https://codeclimate.com/github/completejavascript/gatsby-blog-template/maintainability)

# gatsby-blog-template

A GatsbyJS Blog Template for blogging purpose.

## Installation

Install this template (assuming [Gatsby](https://github.com/gatsbyjs/gatsby/) is installed and updated) by running from your CLI:

```bash
gatsby new YourProjectName https://github.com/yangnianbing/blog-by-gatsby
npm run develop # or gatsby develop
```

Or you can fork the project, make your changes there and merge new features when needed.

Alternatively:

```bash
git clone https://github.com/yangnianbing/blog-by-gatsby
YourProjectName # Clone the project
cd YourProjectname
rm -rf .git # So you can have your own changes stored in VCS.
npm install # or yarn install
npm run develop # or gatsby develop 
```

Navigate to localhost:8000.

## Features

  * Posts and pages in Markdown
  * Tags and categories with pagination
  * Homepage as list of articles, support "Load more" function
  * Code highlight using [Prism.js](https://prismjs.com/) and Tomorrow Night theme
  * Disqus for comment
  * Style using [Shiba.CSS](https://github.com/completejavascript/shiba-css)

## Configuration

Edit the export object in `data/SiteConfig`:

```js
const config = {
  // Site info
  siteTitle: "Gatsby Blog", // Site title.
  siteTitleShort: "GB Template", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://yangmuzi.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A GatsbyJS Blog Template for blogging purpose.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "en",
  siteFBAppID: "399626517562189", // FB Application ID for using app insights
  googleAnalyticsID: "UA-96543695-7", // GA tracking ID.
  postDefaultCategoryID: "", // Default category for posts.
  // Common for tag, category pages and widget
  numberLatestPost: 8,
  postsPerPage: 6,
  // Use for post
  dateFromFormat: "YYYY-MM-DD HH:mm:ss", // Date format used in the frontmatter.
  dateFormat: "MMMM Do, YYYY", // Date format for display.
  postTagged: "TAGGED",
  postInCategories: "POSTED IN",
  postOnDate: "Posted on",
  // Use for comment
  lazyLoadComments: true,
  disqusShortname: "gb-template", // Disqus shortname.
  btnLoadComments: "Load comments",
  // Use for home page
  numberLoadmore: 6,
  btnLoadmore: "Load more",
  homeHasLoadmore: true,
  homeHasThumbnail: false,
  homeHeader: "Home",
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  pageNotFoundTitle: "Page Not Found", // 
  pageNotFoundBtn: "Back to our site",
  pageNotFoundContent: "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.",
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHeader: "Posts tagged as", // use in header of tag-template page
  tagHasThumbnail: true,
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHeader: "Posts in category", // use in header of category-template page
  categoryHasThumbnail: true,
  // Use for widget
  categoryWidgetTitle: "Categories",
  tagWidgetTitle: "Tags",
  latestPostsWidgetTitle: "Latest posts",
  linksWidgetTitle: "Links",
  // Use for Google custom search
  searchWidgetTitle: "Looking for?",
  searchWidgetPlaceHolder: "Enter keyword",
  searchEngineID: "008548374781244864787:9ybvtnkbt7o",
  hasSearch: false,
  // Use for links widget
  sidebarSticky: true,
  sidebarLinks: [
    {
      label: "Complete JavaScript",
      url: "https://completejavascript.com/"
    },
    {
      label: "Lam Pham Blog",
      url: "https://phamvanlam.com/"
    },
    {
      label: "Lam Pham Portfolio",
      url: "http://about.phamvanlam.com/"
    },
  ],
  // Use for user info
  userName: "Lam Pham", // Username to display in the author segment.
  userEmail: "yangnianbing@gmail", // Email used for RSS feed"s author segment
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "China Hubei Wuhan", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription:
    "Software Engineer, Web Developer, JavaScript Lover.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Website",
      url: "https://github.com/yangnianbing",
      iconClassName: "fas globe"
    }
  ],
  // Use for navigation
  navTitle: "GB Template",
  navLinks: [
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ],
  // Use for footer
  socialLinks: [
    { 
      label: "Codepen", 
      url: "https://codepen.io/yangnb", 
      iconClassName: "fab codepen" 
    },
    { 
      label: "GitHub",
      url: "https://github.com/yangnianbing",
      iconClassName: "fab github"
    }
  ],
  footerLinks: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Terms of Use", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Sitemap", url: "https://gb-template.netlify.com/sitemap.xml" },
  ],
  copyright: "Copyright © 2019 Lam Pham. Unless otherwise noted, all code MIT license.",
  // Use for manifest
  themeColor: "#2196F3", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF", // Used for setting manifest background color.
  headerImage: [            //Index page header image
    '/image/home.jpg'
  ],
  headerDescription:'talk is cheap show me the code'  //index page header description
  
};


// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/" || config.pathPrefix === "") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
```

## Acknowledgements

This project is based on: 
  
  * [gatsby-advanced-starter](https://github.com/vagr9k/gatsby-advanced-starter/)
  * [taniarascia.com](https://github.com/taniarascia/taniarascia.com)
  * [Shiba.CSS](https://github.com/completejavascript/shiba-css)



## License

This project is open source and available under the [MIT License](https://github.com/completejavascript/gatsby-blog-template/blob/dev/LICENSE).