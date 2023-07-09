import React from 'react';

class RestaurantReviews extends React.Component {
  state = {
    reviews: []
  };

  async componentDidMount() {
    const response = await fetch(`/reviews?restaurantId=${this.props.match.params.id}`);
    const body = await response.json();
    this.setState({reviews: body});
  }

  render() {
    const {reviews} = this.state;
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default RestaurantReviews;
