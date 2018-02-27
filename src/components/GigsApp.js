import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Gigs from './Gigs';
import Gig from './Gig';
import Venues from './Venues';
import base from '../base';


class GigApp extends React.Component {

  constructor() {
    super();
    this.addGig = this.addGig.bind(this);
    this.updateGig = this.updateGig.bind(this);
    this.addGig = this.addGig.bind(this);
    this.removeGig = this.removeGig.bind(this);
    // get initial state
    this.state = {
      gigs: {},
      venues:{},
      artists: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`/website/${this.props.match.params.websiteId}/gigs`, {
      context: this,
      state: `gigs`
    });

    this.artistRef = base.syncState(`/website/${this.props.match.params.websiteId}/artists`, {
      context: this,
      state: 'artists'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // NOTE: all this does is ADD the gig to state. All the heavy lifting is done in subcomopnents
  addGig(gig) {
    //get a copy of the state
    const gigs = {...this.state.gigs};
    //add in our new gigs
    const timestamp = Date.now();
    gigs[`gig-${timestamp}`]= gig;
    //set state
    this.setState({ gigs: gigs })
  }

  updateGig(key, updatedGig) {
    const gigs = {...this.state.gigs};
    gigs[key] = updatedGig;
    this.setState({ gigs });
  }

  removeGig(key) {
    const gigs = {...this.state.gigs};
    gigs[key] = null;
    this.setState({ gigs });
  }

  render() {
    return (
      <div className="tourgigs">
        <div className="header">
          <Header websiteId={this.props.match.params.websiteId}/>
        </div>
        <h3>Gigs</h3>
        <h4>Identifyer | gigDate | Type | Artist-Reference | Venue | ArtistType-Lookup </h4>
        <Gigs
          addGig={this.addGig}
          params={this.props.match.params}
          gigs={this.state.gigs}
          updateGig={this.updateGig}
          removeGig={this.removeGig}
          artists={this.state.artists}
        />
      </div>
    )
  }
}

export default GigApp;