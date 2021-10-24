import ArticlePreview from './ArticlePreview';
import React from 'react';
import axios from 'axios';

class ArticleList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      articles: null
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    const Authorization = token ? {'Authorization': `Token ${token}`} : {};
    const byAuthor = this.props.author ? `?author=${this.props.author}` : '';
    const config = {
      method: 'get',
      url: `http://localhost:3000/api/articles${byAuthor}`,
      headers: { ...Authorization }
    } as any;
   
    axios(config)
    .then( (response:any) => {
      this.setState({articles: response.data.articles})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderArticlesList() {
    switch(this.state.articles) {
      case null:
        return (
          <div className="article-preview">Loading...</div>
        )
      case 0:
        return (
          <div className="article-preview">
            No articles are here... yet.
          </div>
        );
      default:
        return (
          <div> {
            this.state.articles.map((article: any) => {
              return (
                <ArticlePreview article={article} key={article.slug}/>
              );
            })
          }
          </div>
        )
    }
  }

  render() {  
    if(this.props.onlyList) {
      return (
        <>
          {this.renderArticlesList()}
        </>
      )
    }
    return (
      <div className="container page">
        <div className="row">
          {this.renderArticlesList()}
        </div>
      </div>
    );
  }
}

export default ArticleList;
