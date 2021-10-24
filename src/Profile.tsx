import React from 'react';
import axios from 'axios';
import favoriteAuthor from './methods/favoriteAuthor';
import ArticleList from './ArticleList';

class Profile extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      profile: null
    };
  }
  handleFavoriteUser () {
    const user = this.state.profile;
    const getFavoriteAuthor = (profile:any) => {
      if(user.following !== profile.following) {
        this.setState({profile: profile})
      }
    }
    favoriteAuthor(user, getFavoriteAuthor);
  }
  componentDidMount () {
    const token = window.localStorage.getItem('jwt');
    const { username } = this.props.match.params;
    const config = {
      method: 'get',
      url: `http://localhost:3000/api/profiles/${username}`,
      headers: { 
        'Authorization': `Token ${token}`
      }
    } as any;

    axios(config)
    .then((response:any) => {
      this.setState({profile: response.data.profile});
    })
    .catch((error:any) => {
      console.log(error);
    });
  }
  render() {
    const token = window.localStorage.getItem('jwt');
    const disabledClass = token ? '' : 'disabled';
    const profile = this.state.profile;
    const btnOutlineSecondary = 'btn-outline-secondary';
    const btnOutlinePrimary = 'btn-outline-primary';
    const authorFollowClass = `btn btn-sm ${profile?.following ? btnOutlinePrimary : btnOutlineSecondary} ${disabledClass}`;
    const image = profile?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    if(!profile) {
      return (
        <div className="article-preview">Loading...</div>
      )
    };
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} className="user-img" />
                <h4 className="author">{profile.username}</h4>
                <p>
                  {profile.bio}
                </p>
                <button className={authorFollowClass} onClick={() => this.handleFavoriteUser()}>
                <i className="ion-plus-round" />&nbsp; Follow <span className="author">{profile.username}</span>
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active author" href="">
                      {profile.username}&apos;s articles
                    </a>
                  </li>
                </ul>
              </div>
              <ArticleList onlyList={true} author={profile.username}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
