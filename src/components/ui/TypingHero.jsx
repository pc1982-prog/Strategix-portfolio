import React from 'react';
import Typewriter from 'typewriter-effect';
export default function TypingHero(){
  return (
    <div className="text-slate-300">
      <Typewriter options={{ strings: ['Brand Strategy', 'Social Media', 'SEO', 'Web & App'], autoStart:true, loop:true, delay:60 }} />
    </div>
  )
}
