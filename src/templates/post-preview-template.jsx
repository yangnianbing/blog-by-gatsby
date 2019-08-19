import React from "react";
import config from "../../data/SiteConfig";
import Post from '../components/Post/Post'

const PostTemplate = (...arg) => {
  console.log(arg);
  // const { slug, tagList, categoryList, latestPostEdges } = pageContext;
  // const postNode = data.markdownRemark;
  // const title = postNode.frontmatter.title;

  console.log(arg)
  const { data, pageContext } = arg[0]
  
  const { slug, tagList, categoryList, latestPostEdges } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode.frontmatter.title;
  const content = <Post postNode={postNode} config={config} slug={slug} />;
  const sidebar = <Sidebar 
    tagList={tagList} 
    categoryList={categoryList}
    latestPostEdges={latestPostEdges} 
    links={config.sidebarLinks}
  />;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Header title={title} />
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
}
export default PostTemplate;
