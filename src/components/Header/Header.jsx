import React from "react";
import './Header.scss';
import config from "../../../data/SiteConfig";

class Header extends React.Component {
  render() {
    var {title, description} = this.props;
  
    const headerImage = config.headerImage;
    const backgroundImage = `url(${headerImage[Math.floor(Math.random() * (headerImage.length))]})`;

    return (
      <header style={{'backgroundImage':backgroundImage}} className="intro-header border-bottom border-color-light-grey">
        <div className="container">
          <h1 className="margin-none">
            {title}
          </h1>
          <p>
            {description}
          </p>
        </div>
      </header>
    )
  }
}

export default Header;