import axios from 'axios';
import React, { Component } from 'react';

class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = { responseApi: {} };
  }

  componentWillMount() {
    axios.get('http://localhost/api').then((response) => {
      // console.log(response.data.message);
      this.setState({ responseApi: response.data });
    });
  }

  render() {
    return <div>{JSON.stringify(this.state.responseApi.message)}</div>;
  }
}

export default GetData;
