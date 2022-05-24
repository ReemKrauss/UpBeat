import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ text }) => <div className="marker">{text}</div>

export class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 31.771959,
      lng: 35.217018,
    },
    zoom: 8,
  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact yesIWantToUseGoogleMapApiInternals bootstrapURLKeys={{ key: 'AIzaSyBiEYKWFq2oqrUr4W83S8Em63Ppdp8E_6Y' }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          <Marker lat={31.771959} lng={35.217018} text="Jerusalem" />
          <Marker lat={32.109333} lng={34.855499} text="Tel Aviv" />
          <Marker lat={32.794044} lng={34.989571} text="Haifa" />
        </GoogleMapReact>
      </div>
    )
  }
}
