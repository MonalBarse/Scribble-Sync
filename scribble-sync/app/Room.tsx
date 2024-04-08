"use client"; // This line is required to use Liveblocks client-side SDK

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";

const Room = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider
      id="fig-room"
      /**
       * initialPresence is used to initialize the presence of the current
       * user in the room.
       *
       * initialPresence: https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider
       */
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      /**
       * initialStorage is used to initialize the storage of the room.
       *
       * initialStorage: https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider
       */
      initialStorage={{
        /**
         * We're using a LiveMap to store the canvas objects
         *
         * LiveMap: https://liveblocks.io/docs/api-reference/liveblocks-client#LiveMap
         */
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<h5>Loading</h5>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;

/* 
  A room is a shared space where users can collaborate in real-time. In liveblocks, a room is created using the RoomProvider component.
  The RoomProvider component initializes the presence and storage of the room, allowing users to interact and share data within the room.
  In this example, the Room component wraps the children components with the RoomProvider,
  setting up the initial presence and storage for the room. 
  This enables real-time collaboration and synchronization of data between users in the room.
*/
