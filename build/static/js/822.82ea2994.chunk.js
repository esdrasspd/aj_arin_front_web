"use strict";(self.webpackChunkwibe_test=self.webpackChunkwibe_test||[]).push([[822],{4822:(e,t,i)=>{i.r(t),i.d(t,{default:()=>m});var o=i(5043),n=i(6867),a=i(1345),l=i(3840),r=i(579);const s=(0,n.Ay)(a.P.div)`
  width: 100vw;
  z-index: 6;
  position: absolute;
  top: ${e=>e.click?"0":`-${e.theme.navHeight}`};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  @media (max-width: 40em) {
    top: ${e=>e.click?"0":"calc(-50vh - 4rem)"};
  }
`,c=(0,n.Ay)(a.P.ul)`
  position: relative;
  height: ${e=>e.theme.navHeight};
  background-color: ${e=>e.theme.body};
  color: ${e=>e.theme.text};
  list-style: none;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  padding: 0 10rem;

  @media (max-width: 40em) {
    flex-direction: column;
    padding: 2rem 0;
    height: 50vh;
  }
`,d=n.Ay.li`
  background-color: ${e=>`rgba(${e.theme.textRgba}, 0.7)`};
  list-style-type: style none;
  color: ${e=>e.theme.body};
  width: 15rem;
  height: 2.5rem;

  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${e=>e.theme.fontmd};
  font-weight: 600;
  text-transform: uppercase;

  cursor: pointer;

  @media (max-width: 40em) {
    width: 10rem;
    height: 2rem;
  }
`,h=(0,n.Ay)(a.P.li)`
  text-transform: uppercase;
  color: ${e=>e.theme.text};
  cursor: pointer;
  @media (max-width: 40em) {
    flex-direction: column;
    padding: 0.5rem 0;
  }
`,m=()=>{const[e,t]=(0,o.useState)(!1),{scroll:i}=(0,l.g7)(),n=o=>{let n=document.querySelector(o);t(!e),i.scrollTo(n,{offset:"-100",duration:"2000",easing:[.25,0,.35,1]})};return(0,r.jsx)(s,{click:+e,initial:{y:"-100%"},animate:{y:0},transition:{duration:2,delay:5},children:(0,r.jsxs)(c,{drag:"y",dragConstraints:{top:0,bottom:70},dragElastic:.05,dragSnapToOrigin:!0,children:[(0,r.jsx)(d,{onClick:()=>t(!e),children:"Menu"}),(0,r.jsx)(h,{onClick:()=>n("#home"),whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,Y:0},children:"Home"}),(0,r.jsx)(h,{onClick:()=>n(".about"),whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,Y:0},children:"acerca de"}),(0,r.jsx)(h,{onClick:()=>n("#shop"),whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,Y:0},children:"cont\xe1ctanos"})]})})}}}]);
//# sourceMappingURL=822.82ea2994.chunk.js.map