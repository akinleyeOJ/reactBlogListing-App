import React, {Component} from 'react';
import PostItem from './PostItem';
import axios from 'axios';

class Posts extends Component {
  state = {
    posts: [],
    isLoaded: false,
  };

  componentDidMount() {
    axios
      .get('https://epower.ng/wp-json/wp/v2/posts')
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {posts, isLoaded} = this.state;
   
      return (
        <div>
          {posts.map((posts) => (
            <PostItem key={posts.id} posts={posts} />
          ))}
        </div>
      );
    }
  
}

export default Posts;