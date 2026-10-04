import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FullBleedImage, Grade, Texture, fadeInOut} from '../components';
import {assets, theme} from '../theme';

const words = ['PLACES.', 'EMPIRES.', 'POETRY.', 'PROPHECY.'];
export const PremiseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{backgroundColor: theme.navy, opacity: fadeInOut(frame, durationInFrames, 12)}}>
    <FullBleedImage src={assets.landscape} scaleFrom={1.18} scaleTo={1.1} xFrom={35} xTo={-20}/><Grade strength={0.86}/>
    <div style={{position: 'absolute', inset: '170px 130px 210px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38}}>
      {words.map((word, index) => {
        const enter = interpolate(frame, [index * 17, index * 17 + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16,1,.3,1)});
        return <div key={word} style={{display: 'flex', alignItems: 'center', padding: '0 46px', borderLeft: `3px solid ${index % 2 ? theme.gold : theme.cyan}`, background: 'rgba(3,25,45,.78)', opacity: enter, translate: `${(1-enter) * 60}px 0px`, fontFamily: theme.serif, fontSize: 76, color: theme.ink}}>{word}</div>;
      })}
    </div>
    <div style={{position: 'absolute', bottom: 98, width: '100%', textAlign: 'center', fontFamily: theme.sans, fontSize: 32, letterSpacing: 8, color: theme.cyan, opacity: interpolate(frame, [75,98], [0,1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>ONE CONNECTED PLACE TO STUDY.</div>
    <Texture/>
  </AbsoluteFill>;
};
