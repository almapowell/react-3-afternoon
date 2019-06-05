import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

let baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts`)
      .then(response => {
        this.setState({posts: response.data})
      })
  }

  updatePost() {
    axios.put(`${baseUrl}/posts`).then(response => {
      this.setState({ posts:response.data})
    })
  }

  deletePost() {
    axios.delete(`${baseUrl}/posts`)
      .then(response => this.setState({
        posts: response.data
      }))
  }

  createPost() {
    axios.post(`${baseUrl}/posts`)
      .then(response => this.setState({
        posts: response.data
      }))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost} />
          {
            posts.map( post => (
              <Post key={post.id}
              text= {post.text}
              date= {post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}/>
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
