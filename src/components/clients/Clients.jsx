// import React from 'react';
// import { clients, images } from '../../data/siteContent';
// import RevealOnScroll from '../ui/RevealOnScroll';

// export default function Clients(){
//   return (
//     <div id="clients">
//       <h2 className="text-3xl font-bold mb-4">{clients.title}</h2>
//       <div className="mb-3 text-primary font-semibold">{clients.note}</div>
//       <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
//         {clients.logos.map((l, i) => (
//           <RevealOnScroll key={i}>
//             <div className="p-3 rounded bg-[#071124] flex items-center justify-center border border-slate-800">
//               <img src={l} alt={`client-${i}`} className="max-h-10 object-contain" loading="lazy" />
//             </div>
//           </RevealOnScroll>
//         ))}
//       </div>
//     </div>
//   )
// }
