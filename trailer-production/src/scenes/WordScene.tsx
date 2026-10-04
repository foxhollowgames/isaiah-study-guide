import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FullBleedImage, Grade, Kicker, Texture, fadeInOut, rise} from '../components';
import {assets, theme} from '../theme';

export const WordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const card = interpolate(frame,[16,42],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{backgroundColor: theme.navy, opacity: fadeInOut(frame,durationInFrames,12)}}>
    <FullBleedImage src={assets.landscape} scaleFrom={1.15} scaleTo={1.08} xFrom={-30} xTo={20} opacity={.62}/><Grade strength={.88}/>
    <div style={{position:'absolute',left:120,top:290,width:720,translate:`0px ${rise(frame,5,38)}px`}}>
      <Kicker>WORD STUDY</Kicker>
      <div style={{fontFamily:theme.serif,fontSize:82,lineHeight:1.05,color:theme.ink,marginTop:26}}>MOVE FROM READING</div>
      <div style={{fontFamily:theme.serif,fontSize:82,lineHeight:1.05,color:theme.cyan}}>TO CLOSE READING.</div>
      <div style={{fontFamily:theme.sans,fontSize:28,color:theme.muted,marginTop:34}}>1,322 curated word studies</div>
    </div>
    <div style={{position:'absolute',right:130,top:155,width:720,height:740,padding:'54px 60px',background:'rgba(4,30,51,.96)',border:`1px solid ${theme.blue}`,borderRadius:18,boxShadow:'0 30px 90px #000a',opacity:card,translate:`${(1-card)*90}px 0px`}}>
      <Kicker color={theme.cyan}>SELECTED WORD</Kicker>
      <div style={{fontFamily:theme.serif,fontSize:94,color:theme.ink,marginTop:36}}>peace</div>
      <div style={{fontFamily:theme.serif,fontSize:78,color:theme.gold,marginTop:8,direction:'rtl',textAlign:'left'}}>שָׁלוֹם</div>
      <div style={{fontFamily:theme.sans,fontSize:26,color:theme.muted,marginTop:20}}>Strong's H7965  ·  shalom</div>
      <div style={{height:1,background:theme.blue,margin:'34px 0'}}/>
      <div style={{fontFamily:theme.sans,fontSize:31,lineHeight:1.55,color:theme.ink}}>Wholeness, welfare, peace, and well-being.</div>
      <div style={{fontFamily:theme.sans,fontSize:23,lineHeight:1.5,color:theme.muted,marginTop:34}}>Select a linked word without leaving the verse.</div>
    </div>
    <Texture/>
  </AbsoluteFill>;
};
