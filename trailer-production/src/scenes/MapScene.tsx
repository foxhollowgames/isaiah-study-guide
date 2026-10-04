import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kicker, Texture, fadeInOut} from '../components';
import {assets, theme} from '../theme';

export const MapScene: React.FC<{proof?: boolean}> = ({proof = false}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const route = interpolate(frame, [8, proof ? 88 : 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.3,.05,.2,1)});
  const panel = interpolate(frame, [proof ? 76 : 98, proof ? 112 : 132], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16,1,.3,1)});
  const copy = interpolate(frame, [proof ? 92 : 128, proof ? 122 : 162], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: theme.navy, opacity: proof ? 1 : fadeInOut(frame, durationInFrames, 14), overflow: 'hidden'}}>
    <Img src={staticFile(assets.interface)} style={{position: 'absolute', inset: -90, width: 2100, height: 1260, objectFit: 'cover', filter: 'brightness(.72) saturate(.92)', scale: interpolate(frame,[0,durationInFrames],[1.08,1.18]), translate: `${interpolate(frame,[0,durationInFrames],[-90,-160])}px 0px`}}/>
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(2,13,24,.04) 0%, rgba(2,13,24,.08) 55%, rgba(2,13,24,.88) 100%)'}}/>
    <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <path d="M300 810 C420 760 500 700 560 620 S610 570 650 555" fill="none" stroke="#04111c" strokeWidth="15" opacity=".55"/>
      <path d="M300 810 C420 760 500 700 560 620 S610 570 650 555" fill="none" stroke={theme.cyan} strokeWidth="7" strokeDasharray="980" strokeDashoffset={980 * (1-route)}/>
      <circle cx="650" cy="555" r={13 + Math.sin(frame*.18)*3} fill={theme.gold} opacity={route}/>
      <circle cx="650" cy="555" r="32" fill="none" stroke={theme.gold} strokeWidth="3" opacity={route}/>
    </svg>
    <div style={{position: 'absolute', left: 108, top: 94}}><Kicker>TRACE THE STORY</Kicker></div>
    <div style={{position: 'absolute', right: 86, top: 160, width: 650, minHeight: 620, padding: '46px 50px', border: `1px solid ${theme.blue}`, borderRadius: 16, background: 'rgba(3,25,46,.96)', boxShadow: '-26px 22px 70px #000b', opacity: panel, translate: `${(1-panel)*190}px 0px`}}>
      <Kicker color={theme.gold}>ISAIAH 37</Kicker>
      <div style={{fontFamily: theme.serif, fontSize: 50, color: theme.ink, marginTop: 18, borderBottom: `1px solid ${theme.blue}`, paddingBottom: 24}}>The letter and the prayer</div>
      <div style={{display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18, marginTop: 34, fontFamily: theme.serif, fontSize: 31, lineHeight: 1.55, color: theme.ink}}>
        <span style={{fontFamily: theme.sans, color: theme.cyan, fontSize: 24}}>1</span>
        <span>When King Hezekiah heard it, he tore his clothes, covered himself with sackcloth, and went into the LORD's house.</span>
      </div>
      <div style={{marginTop: 34, padding: '18px 22px', background: 'rgba(16,71,102,.86)', borderLeft: `4px solid ${theme.cyan}`, fontFamily: theme.sans, fontSize: 20, color: theme.muted}}>Passage, place, and historical setting remain connected.</div>
    </div>
    {!proof && <div style={{position: 'absolute', left: 90, bottom: 84, width: 950, padding: '26px 32px 28px', borderLeft: `5px solid ${theme.cyan}`, background: 'rgba(2,13,24,.88)', boxShadow: '0 20px 60px #0009', opacity: copy}}>
      <div style={{fontFamily: theme.serif, fontSize: 58, lineHeight: 1.02, color: theme.ink}}>READ THE TEXT.</div>
      <div style={{fontFamily: theme.serif, fontSize: 58, lineHeight: 1.02, color: theme.cyan}}>SEE THE WORLD AROUND IT.</div>
      <div style={{fontFamily: theme.sans, fontSize: 22, color: theme.muted, marginTop: 16}}>Approximate routes stay labeled.</div>
    </div>}
    <Texture/>
  </AbsoluteFill>;
};
