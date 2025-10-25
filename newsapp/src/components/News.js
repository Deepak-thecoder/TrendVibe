import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  apiKey = process.env.REACT_APP_API_KEY;

  static defaultProps = {
    country: 'us',
    pageSize: 20,
    category: 'business'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - TrendPulse`;
  }

  capitalizeFirstLetter = (val) => val.charAt(0).toUpperCase() + val.slice(1);

  async fetchArticles() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    console.log("Fetching articles from API...");
    // const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.apiKey}`;
    this.props.setProgress(30);
    try {
      const response = await fetch(url);
      console.log("Response object:", response);
      this.props.setProgress(70);
      const data = await response.json();
      console.log("Fetched data:", data);
      const newArticles = Array.isArray(data.articles) ? data.articles : [];

      this.setState({
        articles: this.state.articles.concat(newArticles),
        totalResults: data.totalResults || 0,
        loading: false
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchMoreData = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), () => this.fetchArticles());
  }

  render() {
    return (
      <div className="container content-wrapper">
        <h1 className="text-center">{`TrendPulse - ${this.capitalizeFirstLetter(this.props.category)} Top Headlines`}</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="text-center my-3">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="row">
            {this.state.articles.map((element, index) => (
              <div className="col-md-4" key={element.url ? element.url : index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage ? element.urlToImage : ""}
                  newsUrl={element.url ? element.url : ""}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source && element.source.name ? element.source.name : "Unknown"}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
