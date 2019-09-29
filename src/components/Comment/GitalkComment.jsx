import React, { Component } from "react";
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

class GitalkComment extends Component {

    componentDidMount(){
        var gitalk = new Gitalk({
            clientID: 'c22c8dc5a408526518ae',
            clientSecret: 'e375364b59350e1027178a93e1e8af885e937997',
            repo: 'comment',
            owner: 'yangnianbing',
            admin: ['yangnianbing'],
            id: location.pathname,      // Ensure uniqueness and length less than 50
            distractionFreeMode: false  // Facebook-like distraction free mode
          })
          
          gitalk.render('gitalk-container')
    }
    
    render() {
        return (
            <div id="gitalk-container"/>
          );
    }

}

export default GitalkComment;
