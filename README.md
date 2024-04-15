# Scribble Sync

Scribble Sync is a real-time whiteboarding application that enables collaborative drawing and diagramming. With Scribble Sync, users can create shapes, diagrams, and freeform drawings together in real-time, making it ideal for brainstorming sessions, planning meetings, and collaborative presentations.

## Features

- Real-time Collaboration: Multiple users can collaborate on a single canvas simultaneously, allowing for seamless teamwork.
- Drawing Tools: Scribble Sync provides a variety of drawing tools, including shapes, pens, and text, to enable users to express their ideas creatively.
- Intuitive Interface: The interface is designed to be user-friendly and intuitive, making it easy for users to navigate and use the drawing tools effectively.
- Liveblocks Integration: Scribble Sync leverages Liveblocks for real-time synchronization of drawing actions across all connected users.
- Fabric.js: Fabric.js is used as the rendering engine for the drawing canvas, providing powerful features for handling shapes, layers, and interactions.
- SHADCN: The application is styled using SHADCN, a lightweight CSS framework that provides modern and customizable styling.

## Technologies Used

- [Liveblocks](https://liveblocks.io/): Liveblocks is a real-time collaboration platform that provides synchronization primitives for building collaborative applications.
- [Fabric.js](http://fabricjs.com/): Fabric.js is a JavaScript library that provides interactive object model on top of HTML5 canvas elements.
- [SHADCN](https://shadcn.io/): SHADCN was used for the component styling as it is a lightweight CSS framework that provides modern and customizable styling.
- [Tailwind CSS](https://tailwindcss.com/): I planned to use Tailwind CSS for utility-first CSS styling as it is highly customizable and easy to use.
- [TypeScript](https://www.typescriptlang.org/): TypeScript was used for writing the application code, providing type safety and enhanced developer productivity.
- [Convex DB](https://convexdb.com/): Convex DB was used as it is a real-time database that provides seamless synchronization of data across clients.
- [Clerk](https://clerk.dev/): Clerk is an authentication and user management platform which was used for secure and scalable authentication for out applications.

### Thanks to 
- [LiveBlocks](https://liveblocks.io/) for the documentation and tutorials on how to use LiveBlocks and make a whiteboard application.
- [ConvexDocks](https://docs.convex.dev/get-started) helped me to understand how to use Convex DB for storing the data of the users and the rooms in short time.
- [UI Material](https://www.figma.com/file/WvBPIfCrmBmK6cULNsaHgf/SALY---3D-Illustration-Pack-(Community)?type=design&node-id=234-56&mode=design&t=ATEfoHGMVQg0X5WP-0) for Great 3D figma illustrations which were free to use
- [unDraw](https://undraw.co/illustrations) for the simple and minimalistic illustrations which were free to use
- https://youtu.be/eFbXTo0aanQ?si=ynDF3YEMBYDCbdL- for the tutorial on how to build use LiveBlocks 

### Future Plans
(This is a v2 release of the application)

- I plan to intergrate different rooms for the users for accessing the whiteboard.

## Getting Started

To run Scribble Sync locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/scribble-sync.git
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the website 


