import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import Nav from "./Nav"; 
import Footer from "./Footer";

class Article extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      article: null
    };
  }

  componentDidMount() { 
    const { id } = this.props.match.params;
    const config = {
      method: 'get',
      url: `http://localhost:3000/api/articles/${id}`,
      headers: { }
    } as any;

    axios(config)
    .then( (response:any) => {
      console.log(response.data);
      this.setState({article: response.data.article})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const article = this.state.article;
    const btnOutlineSecondary = 'btn-outline-secondary';
    const btnOutlinePrimary = 'btn-outline-primary';
    const authorFollowClass = `btn btn-sm ${article?.author.following ? btnOutlinePrimary : btnOutlineSecondary}`;
    const postFollowClass = `btn btn-sm ${article?.favorited ? btnOutlinePrimary : btnOutlineSecondary}`;
    if(!article) {
      return (
        <>
          <Nav />
            <div className="article-preview">Loading...</div>
          <Footer/>
        </>
      )
    };
    return (
      <>
        <Nav />
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1> {article.title}</h1>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>

              <div className="article-meta">
                <Link to={`/@${article.author.username}`}>
                  <img src={article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt={article.author.username} />
                </Link>
                <div className="info">
                  <Link to={`/@${article.author.username}`} className="author">
                    {article.author.username}
                  </Link>
                  <span className="date">{new Date(article.createdAt).toDateString()}</span>
                </div>
                <button className={authorFollowClass}>
                  <i className="ion-plus-round" />&nbsp; Follow <span className="author">{article.author.username}</span>
                </button>
                &nbsp;&nbsp;
                <button className={postFollowClass}>
                  <i className="ion-heart" />
                  &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
                </button>
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <a href="/#/profile/ericsimmons">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="/#/profile/ericsimmons" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow Eric Simons
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart" />
                  &nbsp; Favorite Post <span className="counter">(29)</span>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                  </div>
                  <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit" />
                      <i className="ion-trash-a" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </>
    );
  }
}
export default Article;