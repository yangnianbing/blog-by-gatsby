import CMS from 'netlify-cms-app'

//import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
//import ProductPagePreview from './preview-templates/ProductPagePreview'

//CMS.registerPreviewTemplate('about', AboutPagePreview)
//CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
