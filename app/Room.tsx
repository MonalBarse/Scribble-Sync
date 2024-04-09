"use client";
// This file came from the Liveblocks React SDK
// It is a custom component that wraps the RoomProvider component 
// and provides the initialPresence and initialStorage props to the RoomProvider component.

import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";
import { RoomProvider } from "@/liveblocks.config";
import Loader from "@/components/Loader";

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
       {/* Provide a loader of your choice here */}
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default Room;