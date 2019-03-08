import * as React from 'react';
import styled from 'styled-components';
import {Button} from "./Button";

const PlayButton = styled(Button)`
  background-color: green;
`;

export default class Streamer extends React.Component<{}> {

    private video!: HTMLVideoElement;

    public constructor(props: any) {
        super(props);
        this.onPlay = this.onPlay.bind(this);
    }

    private async onPlay() {
        // Prefer camera resolution nearest to 1280x720.
        var constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream) => {
                if(this.video) {
                    this.video.srcObject = mediaStream;
                    this.video.onloadedmetadata = (_e: any) => {
                        this.video.play();
                    };
                }

            })
            .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

    }

    public render() {
        return (
            <div>
                <video ref={(video: HTMLVideoElement) => this.video = video} autoPlay={true}/>
                <br/>
                <PlayButton onClick={this.onPlay}>Play</PlayButton>
            </div>
        );
    }
}