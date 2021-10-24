import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import updateLogin from './methods/updateLogin';
import favoriteArticle from './methods/favoriteArticle';
import favoriteAuthor from './methods/favoriteAuthor';

class Article extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      article: null
    };
  }
  handleFavoriteArticle () {
    const getFavoriteArticle = (article:any) => {
      this.setState({article: article})
    }
    favoriteArticle(this.state.article, getFavoriteArticle);
  }

  handleFavoriteUser () {
    const user = this.state.article.author;
    const article = this.state.article;
    const getFavoriteAuthor = (profile:any) => {
      if(profile.following !== user.following) {
        article.author.following = profile.following;
        this.setState({article: article})
      }
    }
    favoriteAuthor(user, getFavoriteAuthor);
  }

  componentDidMount() { 
    const { id } = this.props.match.params;
    const oldToken = window.localStorage.getItem('jwt');

    const getArticle = (user:any) => {
      const Authorization = user.token ? {'Authorization': `Token ${user.token}`} : {};
      const config = {
        method: 'get',
        url: `http://localhost:3000/api/articles/${id}`,
        headers: { 
          ...Authorization
        }
      } as any;
      
      axios(config)
      .then((response:any) => {
        this.setState({article: response.data.article})
      })
      .catch((error) => {
        console.log(error);
      });
    };
    if(oldToken) {
      updateLogin(oldToken, getArticle);
    } else {
      getArticle({})
    }
  }

  render() {
    const article = this.state.article;
    const btnOutlineSecondary = 'btn-outline-secondary';
    const btnOutlinePrimary = 'btn-outline-primary';
    const authorFollowClass = `btn btn-sm ${article?.author.following ? btnOutlinePrimary : btnOutlineSecondary}`;
    const postFollowClass = `btn btn-sm ${article?.favorited ? btnOutlinePrimary : btnOutlineSecondary}`;
    const image = article?.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    if(!article) {
      return (
        <div className="article-preview">Loading...</div>
      )
    };
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1> {article.title}</h1>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
            <div className="article-meta">
              <Link to={`/profiles/${article.author.username}`}>
                <img src={image} alt={article.author.username} />
              </Link>
              <div className="info">
                <Link to={`/profiles/${article.author.username}`} className="author">
                  {article.author.username}
                </Link>
              </div>
              <button className={authorFollowClass} onClick={() => this.handleFavoriteUser()}>
                <i className="ion-plus-round" />&nbsp; Follow <span className="author">{article.author.username}</span>
              </button>
              &nbsp;&nbsp;
              <button className={postFollowClass} onClick={() => this.handleFavoriteArticle()}>
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
              <Link to={`/profiles/${article.author.username}`}>
                <img src={image} alt={article.author.username} />
              </Link>
              <div className="info">
                <Link to={`/profiles/${article.author.username}`} className="author">
                  {article.author.username}
                </Link>
              </div>
              <button className={authorFollowClass} onClick={() => this.handleFavoriteUser()}>
                <i className="ion-plus-round" />&nbsp; Follow <span className="author">{article.author.username}</span>
              </button>
              &nbsp;&nbsp;
              <button className={postFollowClass} onClick={() => this.handleFavoriteArticle()}>
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Article;