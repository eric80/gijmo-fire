import React from 'react';
import { slugify } from '../helper';


class AddTrackForm extends React.Component {

  createTrack(event) {
    event.preventDefault();
    console.log('Entering Track');
    const gigFilename = this.props.gigs[this.gig.value].gigFilename;

    const track = {
      trackName: this.trackName.value,
      trackFilename: gigFilename+ "_" + slugify(this.trackName.value),
      trackOrder: this.trackOrder.value,
      trackWebsite: this.props.params.websiteId,
      trackGig: this.gig.value,
      trackSong: this.song.value,

    }
    console.log(track)
    this.props.addTrack(track);
    this.trackForm.reset();
  }
  render() {
    return (
      <form ref={(input) => this.trackForm = input} className="track-edit" onSubmit={(e) => this.createTrack(e)}>
        <input ref={(input) => this.trackName = input} type="text" placeholder="Track Name" />
        <select ref={(input) => this.gig = input}>
          {Object.keys(this.props.gigs).map((key) => {
            return (
              <option
              key={key}
              value={key}>
              {this.props.gigs[key].gigFilename}
              </option>
            )
          })}
        </select>

        <input ref={(input) => this.trackOrder = input} type="text" placeholder="Track Order" />


        <select ref={(input) => this.song = input}>
          {Object.keys(this.props.songs).map((key) => {
            return (
              <option
              key={key}
              value={key}>
              {this.props.songs[key].songFilename}
              </option>
            )
          })}
        </select>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default AddTrackForm;
