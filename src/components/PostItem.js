import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class PostItem extends Component {
    state = {
        imgUrl: '',
        isLoaded: false
    }
    static propTypes = {
        posts: PropTypes.object.isRequired
    }

    componentDidMount () {
        const { featured_media } = this.props.posts;
        const getImageUrl = axios.get(`https://epower.ng/wp-json/wp/v2/media/${featured_media}`);

        Promise.all([getImageUrl]).then(res => {
           this.setState({
             imgUrl: res[0].data.media_details.sizes.full.source_url,
             isLoaded: true
           })
        });

    }

    render() {
        const { slug, title, excerpt } = this.props.posts;
        const {imgUrl, isLoaded}=this.state;
        if(isLoaded) {
            return (
                <Link 
                style={{textDecoration: 'none'}}
                             to={`/posts/${slug}`}>
                             }}>
                <div>
                <h4>{title.rendered}</h4>
                <img style={{width: '100%'}} src={ imgUrl } alt={title.rendered} />
                <div dangerouslySetInnerHTML={{ __html: excerpt.rendered}} />
                
            </div>
            </Link>
            )
        }
        return null;
    }
}

export default PostItem;
