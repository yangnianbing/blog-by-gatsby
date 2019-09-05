import React from "react";
import config from "../../data/SiteConfig";
import Post from '../components/Post/Post';
import Layout from "../layout";


const BlogPreviewPostTemplate = ({content}) => {
  return (
    <div>{content}</div>
  );
}
export default BlogPreviewPostTemplate;
