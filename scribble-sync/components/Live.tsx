import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@/liveblocks.config";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import ReactionSelector from "./reactions/ReactionButton";
import useInterval from "@/hooks/useInterval";
import FlyingReaction from "./reactions/FlyingReaction";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  undo: () => void;
  redo: () => void;
};

const Live = ({ canvasRef, undo, redo }: Props) => {
  const others = useOthers(); // This hooks returns the presence of other users in the room
  // const [myPresence, updateMyPresence] = useMyPresence(); // This hooks returns the presence of the current user in the room
  const [{ cursor }, updateMyPresence] = useMyPresence() as any; // useMyPresence returns presence and updateMyPresence function, in presence state we have cursor and message of the user
  // cursor gives us the position of the cursor of the user (i.e x and y position of the cursor)

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  // For reactions
  const [reactions, setReactions] = useState<Reaction[]>([]);

  // For handling when pointer moves in the canvas
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault(); // Prevents default which is to select text when we click and drag
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // If the Cursor Mode is ReactionSelector then we don't update the cursor position
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x; // To calculate we substract the x position of the mouse relative to the target element from the x position of the target
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  // For hiding the cursor when the pointer leaves the screen
  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null }); // TS: as mode is Hidden, we need to set the cursor and message to null as type CursorState if mode is Hidden we dont have cursor and message in the state
  }, []);

  // To show the cursor when the mouse enters the canvas
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });

      // if cursor is in reaction mode, set isPressed to true
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ? { ...state, isPressed: false }
        : state
    );
  }, [cursorState.mode, setCursorState]);

  // set the reaction of the cursor
  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Broadcast the reaction to other users (every 100ms)
  const broadcast = useBroadcastEvent();
  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      // concat all the reactions created on mouse click
      setReactions((prevState) => [
        ...prevState,
        {
          point: { x: cursor.x, y: cursor.y },
          value: cursorState.reaction,
          timestamp: Date.now(),
        },
      ]);

      // Broadcast the reaction to other users
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 170);

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    // This will remove the reactions that are stored in the state 'reactions' which are older than 3 seconds for optimization
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 3000)
    );
  }, 1000);

  useEventListener((eventData) => {
    //useEventListener is a hook provided by liveblocks to listen to events in the room from other users
    const event = eventData.event as ReactionEvent;
    setReactions((prevState) => [
      ...prevState,
      {
        point: { x: event.x, y: event.y },
        value: event.value,
        timestamp: Date.now(),
      },
    ]);
  });

  // To handle keyboard events
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: "",
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      id= "canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
      <canvas className="border border-gray-400" ref={canvasRef} />
      {/* Render the reactions */}
      {reactions.map((reaction) => (
        <FlyingReaction
          key={reaction.timestamp.toString()}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      ))}
      {/* If cursor is in chat mode, show the chat cursor */}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {/* If cursor is in reaction selector mode, show the reaction selector */}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={(reaction) => {
            setReaction(reaction);
          }}
        />
      )}
      <LiveCursors others={others} />{" "}
      {/* To render the cursors of other users in the room*/}
    </div>
  );
};

export default Live;
