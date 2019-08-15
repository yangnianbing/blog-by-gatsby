import React, { Component } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import "./Navigation.scss";

class Navigation extends Component {
  rootRef = React.createRef();

  state = {
    openDropdown: false
  }

  handleClick = () => {
    this.setState((prevState) => ({
      openDropdown: !prevState.openDropdown
    }));
  }


  handleScroll = () => {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.changeNatigationStatus();
    }, 1);
  }

  changeNatigationStatus = () => {
    const thresholdTop = this.props.thresholdTop || 150;

    if (document.body.scrollTop > thresholdTop ||
      document.documentElement.scrollTop > thresholdTop) {
      this.rootElm.classList.add('scrolling');
    } else {
      this.rootElm.classList.remove('scrolling');
    }
  }

  componentDidMount() {
    this.rootElm = this.rootRef.current;
    this.changeNatigationStatus ();

    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { brand, title, links} = this.props;
    const { openDropdown } = this.state;
    return (
      <>
        <nav ref={this.rootRef} className = 'navigation-container'>
          <div className="navigation-main container flex align-items-center justify-content-space-between">
            <NavBrand brand={brand} title={title} />
            <NavLinks links={links} />
            <NavBars 
              color="#222" 
              handleClick={this.handleClick} 
              openDropdown={openDropdown}
            />
          </div>
          {
            openDropdown ? (
              <div className="navigation-dropdown container">
                <NavLinks links={links} isDropdown={true} />
              </div>
            ) : null
          }
        </nav>
      </>
    )
  }
}

export default Navigation;