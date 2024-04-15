import dynamic from "next/dynamic";

//   disabling ssr to avoid pre-rendering issues of Next.js 
const App = dynamic(() => import("./App"), { ssr: false });

// CHAT_GPT reason : 
//  we're doing this because we're using a canvas element that can't be pre-rendered by Next.js on the server


export default App;