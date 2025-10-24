import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      
     <div className="my-3">
  <div className="news-card card animate__animated animate__fadeInUp">
    <div className="badge-container">
      <span className="badge rounded-pill bg-danger">{source}</span>
    </div>
    <img
  src={imageUrl && imageUrl !== "" ? imageUrl : process.env.PUBLIC_URL + '/news-image.jpg'}
  className="card-img-top"
  alt={title || "news"}
  onError={(e) => { e.target.src = process.env.PUBLIC_URL + '/news-image.jpg'; }}
/>

    <div className="card-body">
      <h5 className="card-title">{title}...</h5>
      <p className="card-text">{description}...</p>
      <p className="card-text">
        <small className="text-muted">
          By <strong>{author}</strong> on {new Date(date).toLocaleDateString()}
        </small>
      </p>
      <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
        Read More →
      </a>
    </div>
  </div>
</div>
    )
  }
}
