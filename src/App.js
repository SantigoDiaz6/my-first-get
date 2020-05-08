import React from 'react';
import axios from 'axios';
import './App.css';

function Posts ({ posts }) {
  return (
    <div className = "posts">
      <h1>Posts</h1>
      { posts && posts.length > 0 && posts.map(post => {
        return (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )
      })}
    </div>
  )
}

class App extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET'
    })
      .then((response) => {
        this.setState({ posts: response.data})
      })
      .catch((error) => {
        this.setState({ error: true })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render () {
    if(this.state.loading) return <p>loading...</p>
    if(this.state.error) return <p>Ups! something went wrong.</p>
      
    return (
      <div className="App">
        <Posts posts={ this.state.posts } />  
      </div>
    );
  }
}


  

export default App;
