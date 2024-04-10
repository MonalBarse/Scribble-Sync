# Scribble Sync

Scribble Sync is a real-time whiteboarding application that enables collaborative drawing and diagramming. With Scribble Sync, users can create shapes, diagrams, and freeform drawings together in real-time, making it ideal for brainstorming sessions, planning meetings, and collaborative presentations.

## Features

- Real-time Collaboration: Multiple users can collaborate on a single canvas simultaneously, allowing for seamless teamwork.
- Drawing Tools: Scribble Sync provides a variety of drawing tools, including shapes, pens, and text, to enable users to express their ideas creatively.
- Intuitive Interface: The interface is designed to be user-friendly and intuitive, making it easy for users to navigate and use the drawing tools effectively.
- Liveblocks Integration: Scribble Sync leverages Liveblocks for real-time synchronization of drawing actions across all connected users.
- Fabric.js: Fabric.js is used as the rendering engine for the drawing canvas, providing powerful features for handling shapes, layers, and interactions.
- SHADCN: The application is styled using SHADCN, a lightweight CSS framework that provides modern and customizable styling.
- Tailwind: Tailwind CSS is used for utility-first CSS styling, allowing for rapid development and easy customization.
- TypeScript: Scribble Sync is written in TypeScript, providing type safety and enhanced developer productivity.

## Technologies Used

- [Liveblocks](https://liveblocks.io/): Liveblocks is a real-time collaboration platform that provides synchronization primitives for building collaborative applications.
- [Fabric.js](http://fabricjs.com/): Fabric.js is a JavaScript library that provides interactive object model on top of HTML5 canvas elements.
- [SHADCN](https://shadcn.io/): SHADCN is a lightweight CSS framework for building modern and responsive web applications.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework for creating custom designs without writing CSS.
- [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

### Future Plans
(This is a alpha release for testing out the application.)

- I plan to intergrate a proper authentication system for users and different rooms for different users, and access to the rooms.
- I plan to use Convex DB for storing the data of the users and the rooms and and Clerk for authentication.

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
Open [http://localhost:3000](http://localhost:3000) with your browser to see the website or you can visit to see the demo version : [](Here)


