import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {assets, theme} from '../theme';
import {FullBleedImage, Grade, SafeFrame, Texture, fadeInOut, rise} from '../components';

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = fadeInOut(frame, durationInFrames, 14);
  const line = interpolate(frame, [5, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: theme.navy, opacity}}>
    <FullBleedImage src={assets.landscape} scaleFrom={1.03} scaleTo={1.12} xFrom={-24} xTo={18}/>
    <Grade strength={0.76}/>
    <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <path d="M280 820 C520 680 730 720 990 550 S1430 400 1640 250" fill="none" stroke={theme.cyan} strokeWidth="5" strokeDasharray="1350" strokeDashoffset={1350 * (1-line)} opacity=".78"/>
      <circle cx="990" cy="550" r={14 + Math.sin(frame * .18) * 3} fill={theme.gold}/>
      <circle cx="990" cy="550" r="34" fill="none" stroke={theme.gold} strokeWidth="3" opacity={line}/>
    </svg>
    <SafeFrame>
      <div style={{marginTop: 300, translate: `0px ${rise(frame, 8, 44)}px`, opacity: interpolate(frame, [8, 27], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{fontFamily: theme.serif, fontSize: 104, lineHeight: 1.04, maxWidth: 1260, color: theme.ink, letterSpacing: 2, textShadow: '0 6px 38px #000'}}>WHAT IF ISAIAH<br/><span style={{color: theme.cyan}}>HAD A MAP?</span></div>
        <div style={{marginTop: 38, fontFamily: theme.sans, fontSize: 30, letterSpacing: 7, color: theme.muted}}>ENTER THE WORLD AROUND THE TEXT</div>
      </div>
    </SafeFrame>
    <Texture/>
  </AbsoluteFill>;
};
