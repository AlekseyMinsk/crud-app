import ArticlePreview from './ArticlePreview';
import React from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import axios from 'axios';

class ArticleList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      articles: null
    };
  }

  componentDidMount() {
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/articles',
      headers: { }
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
    return (
      <>
      <Nav/>
      <div className="container page">
        <div className="row">
            {this.renderArticlesList()}
          </div>
        </div>
      <Footer/>
      </>
    );
  }
}

export default ArticleList;
