import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kicker, Texture, fadeInOut} from '../components';
import {assets, theme} from '../theme';

const cards = [
  {src:assets.relief,title:'LACHISH RELIEF',note:'Campaign imagery'},
  {src:assets.prism,title:"SENNACHERIB'S PRISM",note:'Royal account'},
  {src:assets.cylinder,title:'CYRUS CYLINDER',note:'Restoration context'},
];
export const EvidenceScene: React.FC = () => {
  const frame=useCurrentFrame(); const {durationInFrames}=useVideoConfig();
  return <AbsoluteFill style={{backgroundColor:'#020a12',opacity:fadeInOut(frame,durationInFrames,12)}}>
    <div style={{position:'absolute',left:100,top:82}}><Kicker color={theme.gold}>FOLLOW THE EVIDENCE</Kicker></div>
    <div style={{position:'absolute',left:94,right:94,top:150,bottom:190,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:38}}>
      {cards.map((card,index)=>{const enter=interpolate(frame,[index*14,index*14+24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <div key={card.title} style={{position:'relative',overflow:'hidden',borderRadius:14,border:'1px solid #315a72',opacity:enter,translate:`0px ${(1-enter)*70}px`}}>
        <Img src={staticFile(card.src)} style={{width:'100%',height:'100%',objectFit:'cover',scale:interpolate(frame,[0,durationInFrames],[1.08,1.16])}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 38%,rgba(1,8,14,.94) 100%)'}}/>
        <div style={{position:'absolute',left:32,right:32,bottom:32}}><div style={{fontFamily:theme.sans,fontSize:22,fontWeight:700,letterSpacing:4,color:theme.ink}}>{card.title}</div><div style={{fontFamily:theme.sans,fontSize:19,color:theme.muted,marginTop:10}}>{card.note}</div></div>
      </div>})}
    </div>
    <div style={{position:'absolute',left:0,right:0,bottom:83,textAlign:'center',fontFamily:theme.sans,fontSize:27,color:theme.muted}}>Sources, quotations, and limits stay with the passage.</div>
    <Texture/>
  </AbsoluteFill>;
};
