import React, { Component } from 'react';
import axios from 'axios';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const ROOT_URL = 'https://dali-dashboard.herokuapp.com/api';

// Create your own class, extending from the Marker class.
class ExtendedMarker extends Marker {
  componentDidMount() {
    super.componentDidMount();
    console.log(this.props.position);
    this.leafletElement.openPopup();
  }

}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
      zoom: 13,
    };
  }
  componentDidMount() {
    const _id = this.props.match.params.id;
    console.log(_id);
    axios.get(`${ROOT_URL}/member`, { params: { _id } }).then((response) => {
      console.log(response);
      this.setState({ member: response.data });
    },
  ).catch((err) => {
    console.log(err);
  });
  }


  render() {
    return (
      <div className="profile-page">
        <Map center={this.state.member.lat_long} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <ExtendedMarker position={this.state.member.lat_long}>
            <Popup>
              <span>
                <img className="profile-cover" alt="cover" src={`../${this.state.member.iconUrl}`} width="320" height="316" />
                <br />
                <div>
                Hi! I am {this.state.member.name}, {this.state.member.message} <i className="fa fa-smile-o" /> Visit my Page <a href={this.state.member.url}>here</a>
                </div>
              </span>
            </Popup>
          </ExtendedMarker>
        </Map>
      </div>
    );
  }
}

export default Profile;
