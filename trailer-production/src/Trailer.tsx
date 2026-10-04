import React from 'react';
import {Audio} from '@remotion/media';
import {Series, staticFile, useVideoConfig} from 'remotion';
import {assets} from './theme';
import {OpeningScene} from './scenes/OpeningScene';
import {PremiseScene} from './scenes/PremiseScene';
import {MapScene} from './scenes/MapScene';
import {WordScene} from './scenes/WordScene';
import {EvidenceScene} from './scenes/EvidenceScene';
import {ModesScene} from './scenes/ModesScene';
import {ClosingScene} from './scenes/ClosingScene';

export const MeridianTrailer:React.FC=()=>{const{fps}=useVideoConfig();return <>
  <Series>
    <Series.Sequence name="Opening hook" durationInFrames={90} premountFor={fps}><OpeningScene/></Series.Sequence>
    <Series.Sequence name="Connected premise" durationInFrames={120} premountFor={fps}><PremiseScene/></Series.Sequence>
    <Series.Sequence name="Map and scripture" durationInFrames={210} premountFor={fps}><MapScene/></Series.Sequence>
    <Series.Sequence name="Close reading" durationInFrames={150} premountFor={fps}><WordScene/></Series.Sequence>
    <Series.Sequence name="Evidence" durationInFrames={150} premountFor={fps}><EvidenceScene/></Series.Sequence>
    <Series.Sequence name="Modes and breadth" durationInFrames={120} premountFor={fps}><ModesScene/></Series.Sequence>
    <Series.Sequence name="Closing brand" durationInFrames={120} premountFor={fps}><ClosingScene/></Series.Sequence>
  </Series>
  <Audio name="Original score" src={staticFile(assets.score)} premountFor={fps} volume={0.82}/>
</>};

export const MapProof:React.FC=()=> <MapScene proof/>;
