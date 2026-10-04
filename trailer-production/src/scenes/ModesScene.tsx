import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kicker, Texture, fadeInOut} from '../components';
import {assets,theme} from '../theme';

export const ModesScene: React.FC=()=>{const frame=useCurrentFrame();const{durationInFrames}=useVideoConfig();const split=interpolate(frame,[8,40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});const stats=interpolate(frame,[50,78],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <AbsoluteFill style={{backgroundColor:theme.navy,opacity:fadeInOut(frame,durationInFrames,12),overflow:'hidden'}}>
  <Img src={staticFile(assets.interface)} style={{position:'absolute',inset:-80,width:2080,height:1240,objectFit:'cover',filter:'brightness(.52) saturate(.8)',scale:1.08}}/>
  <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(2,13,24,.35),rgba(2,13,24,.72),rgba(2,13,24,.36))'}}/>
  <div style={{position:'absolute',left:'50%',top:160,bottom:180,width:2,background:theme.cyan,scale:`1 ${split}`,transformOrigin:'center'}}/>
  <div style={{position:'absolute',left:250,top:210}}><Kicker>HISTORICAL</Kicker></div>
  <div style={{position:'absolute',right:320,top:210}}><Kicker color={theme.gold}>LDS</Kicker></div>
  <div style={{position:'absolute',top:382,width:'100%',textAlign:'center',fontFamily:theme.serif,fontSize:92,color:theme.ink}}>CLEARLY LABELED.</div>
  <div style={{position:'absolute',top:520,width:'100%',textAlign:'center',fontFamily:theme.sans,fontSize:26,color:theme.muted}}>Shared evidence remains visible. Faithful interpretation stays distinct.</div>
  <div style={{position:'absolute',left:255,right:255,bottom:120,display:'grid',gridTemplateColumns:'1fr 1fr',gap:2,opacity:stats}}>
    <div style={{textAlign:'center',borderRight:`1px solid ${theme.blue}`}}><strong style={{display:'block',fontFamily:theme.serif,fontSize:80,color:theme.cyan}}>66</strong><span style={{fontFamily:theme.sans,fontSize:21,letterSpacing:5,color:theme.muted}}>CHAPTERS</span></div>
    <div style={{textAlign:'center'}}><strong style={{display:'block',fontFamily:theme.serif,fontSize:80,color:theme.ink}}>1,292</strong><span style={{fontFamily:theme.sans,fontSize:21,letterSpacing:5,color:theme.muted}}>VERSES</span></div>
  </div><Texture/>
</AbsoluteFill>};
