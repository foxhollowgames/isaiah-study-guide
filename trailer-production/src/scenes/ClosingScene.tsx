import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FullBleedImage, Grade, MeridianBrand, Texture, fadeInOut} from '../components';
import {assets,theme} from '../theme';

export const ClosingScene:React.FC=()=>{const frame=useCurrentFrame();const{durationInFrames}=useVideoConfig();const enter=interpolate(frame,[4,30],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <AbsoluteFill style={{backgroundColor:theme.navy,opacity:fadeInOut(frame,durationInFrames,10)}}>
  <FullBleedImage src={assets.landscape} scaleFrom={1.14} scaleTo={1.06} xFrom={18} xTo={-12}/><Grade strength={.8}/>
  <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:enter,translate:`0px ${(1-enter)*38}px`}}>
    <MeridianBrand/>
    <div style={{width:660,height:2,margin:'48px 0 38px',background:`linear-gradient(90deg,transparent,${theme.cyan},transparent)`}}/>
    <div style={{fontFamily:theme.sans,fontSize:32,fontWeight:700,letterSpacing:8,color:theme.gold}}>FIND YOUR BEARINGS IN ISAIAH.</div>
    <div style={{fontFamily:theme.sans,fontSize:25,color:theme.muted,marginTop:26}}>A map-first study guide for all 66 chapters</div>
    <div style={{fontFamily:theme.sans,fontSize:24,fontWeight:700,letterSpacing:2,color:theme.cyan,marginTop:64}}>isaiah.josephnewelldesign.com</div>
  </div><Texture/>
</AbsoluteFill>};
