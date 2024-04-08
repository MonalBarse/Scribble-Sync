"use client";
import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {
  // Initialization
  const canvasRef = useRef<HTMLCanvasElement>(null); // Referencce to the canvas element to initialize the fabric canvas
  const fabricRef = useRef<fabric.Canvas | null>(null);
  /* Will allow us to access the fabric canvas instance, and perform operations on it, it is like a copy of a created canvas so that we can use it outside of the canvas event-listeners;
    That means the canvasRef.current is the actual canvas element and fabricRef.current is the fabric canvas instance */
  const isDrawing = useRef<boolean>(false); // To keep track of whether the user is drawing or not
  const shapeRef = useRef<fabric.Object | null>(null); // To keep track of the shape that is being drawn
  const selectedShapeRef = useRef<string | null>(null); // To keep track of the shape that is selected
  //------------------------------------//

  useEffect(() => {
    // Initialize the fabric canvas
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({ options, canvas, isDrawing , shapeRef, selectedShapeRef});
    });
    window.addEventListener("resize", () => {
      handleResize({ fabricRef });
    }
    );
  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="h-full flex flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef}/>
        <RightSidebar />
      </section>
    </main>
  );
}
