import { useState } from 'react';
import { Link } from 'react-router-dom';
import favoriteArticle from './methods/favoriteArticle';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';
const DISABLED_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary disabled';

const ArticlePreview = (props: {article:any}) => {
  const [article, setArticle] = useState(props.article);
  const token = window.localStorage.getItem('jwt');
  let favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;
  if(!token) favoriteButtonClass = DISABLED_FAVORITED_CLASS;

const handleClick = () => {
  const getFavorite = (article:any) => {
    setArticle(article)
  }
  favoriteArticle(article, getFavorite);
}

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profiles/${article.author.username}`}>
          <img src={article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/profiles/${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map((tag:any) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;
