"use client";

import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handleCanvasZoom,
  handlePathCreated,
  handleResize,
  initializeFabric,
  renderCanvas,
} from "@/lib/canvas";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import { LeftSidebar, Live, Navbar, RightSidebar } from "@/components/index";
import { handleImageUpload } from "@/lib/shapes";
import { defaultNavElement } from "@/constants";
import { ActiveElement, Attributes } from "@/types/type";

const Home = () => {
  // Proveded by Liveblocks for undo and redo 
  const undo = useUndo();
  const redo = useRedo(); 

  //  Over here, we are storing the canvas objects in the key-value store.
  const canvasObjects = useStorage((root) => root.canvasObjects); // UseStorage is a hook provided by Liveblocks that allows you to store data in a key-value store and automatically sync it with other users

  const canvasRef = useRef<HTMLCanvasElement>(null); // canvasRef is a reference to the canvas element that we use to render the canvas
  const fabricRef = useRef<fabric.Canvas | null>(null); // fabricRef is a reference that is used to access the instance of the Fabric canvas  
  // (ts: fabric.Canvas , here fabric allows us to create canvas and shapes on it (imported from fabric.js) and fabric.Canvas is the type of the canvas object that we are creating on the canvas element.)

  const isDrawing = useRef(false); // ref to check if the user is drawing on the canvas
  const shapeRef = useRef<fabric.Object | null>(null); // ref to the shape that the user is drawing on the canvas

  const selectedShapeRef = useRef<string | null>(null); //refers to shape selected eg. circle , triangle , rectangle , line etc.
// We're using refs here because we want to access these variables inside the event listeners. We don't want to lose the values of these variables when the component re-renders. Refs help us with that.
  
  const activeObjectRef = useRef<fabric.Object | null>(null); // activeObjectRef is a reference to the active/selected object in the canvas
  // We need this reference to keep the selected object selected when the canvas re-renders, as we are using live storage to sync shapes irt, so when it re-renders, the selected object is lost
  // This reference helps us to keep the selected object selected.

  const isEditingRef = useRef(false); // ref to check if the user is editing the object on the canvas

  const imageInputRef = useRef<HTMLInputElement>(null); // reference to the input element that we use to upload an image to the canvas

  const [activeElement, setActiveElement] = useState<ActiveElement>({ // activeElement - state to store the active element in the navbar
    name: "",
    value: "",
    icon: "",
  });

  // When the user clicks on an item in the navbar it will be selected as the active element 
  const handleActiveElement = (elem: ActiveElement) => {

    setActiveElement(elem);

    switch (elem?.value) {
      // delete all the shapes from the canvas
      case "reset":
        // clear the storage
        deleteAllShapes();
        // clear the canvas
        fabricRef.current?.clear();
        // set "select" as the active element
        setActiveElement(defaultNavElement);
        break;

      // delete the selected shape from the canvas
      case "delete":
        // delete it from the canvas
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        // set "select" as the active element
        setActiveElement(defaultNavElement);
        break;

      // upload an image to the canvas
      case "image":
        // trigger the click event on the input element which opens the file dialog
        imageInputRef.current?.click();
        /**
         * set drawing mode to false
         * If the user is drawing on the canvas, we want to stop the
         * drawing mode when clicked on the image item from the dropdown.
         */
        isDrawing.current = false;

        if (fabricRef.current) {
          // disable the drawing mode of canvas
          fabricRef.current.isDrawingMode = false;
        }
        break;

      // for comments, do nothing
      case "comments":
        break;

      default:
        // set the selected shape to the selected element
        selectedShapeRef.current = elem?.value as string;
        break;
    }
  };


  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "none",
    stroke: "#aabbcc",
  });

  //deleteShapeFromStorage is a mutation that deletes a shape from the key-value store of liveblocks
  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => { //useMutation is a hook provided by Liveblocks that allows you to perform
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    // get the canvasObjects store
    const canvasObjects = storage.get("canvasObjects");

    // if the store doesn't exist or is empty, return
    if (!canvasObjects || canvasObjects.size === 0) return true;

    // delete all the shapes from the store
    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }

    // return true if the store is empty
    return canvasObjects.size === 0;
  }, []);

  const syncShapeInStorage = useMutation(({ storage }, object) => { //mutation that syncs the shape in the key-value store of liveblocks.

    // if the passed object is null, return
    if (!object) return;
    const { objectId } = object;

    // Turn Fabric object  into JSON format so that we can store it in the key-value store.
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

 
  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    // when user clicks on the canvas
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });
  //user moves the mouse on the canvas
    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });
  //user releases the mouse on the canvas
    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
      });
    });
    canvas.on("path:created", (options) => { // path:created is provided by fabric.js for listening to freehand drawing
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    });

   // when user modifies the object on the canvas 
   //(object is given to us by fabric.js which means any shape on the canvas (shapes are created by fabric.js))
    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });

    // listening when user moves the created object on the canvas
    canvas?.on("object:moving", (options) => {
      handleCanvasObjectMoving({
        options,
      });
    });


    canvas.on("selection:created", (options) => { //when the user selects an object on the canvas.
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });

    // When user drags and thus scales the object on the canvas
    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    });

    canvas.on("mouse:wheel", (options) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    });
    // for when the user resizes the window
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

   //listen to the key down event on the window which is fired when the user presses a key on the keyboard
     
    window.addEventListener("keydown", (e) =>
      handleKeyDown({ //We're using this to perform some actions like delete, copy, paste, etc when the user presses the respective keys on the keyboard.
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    );

    // dispose the canvas and remove the event listeners when the component unmounts
    return () => {
      canvas.dispose(); // dispose the canvas

      // remove the event listeners
      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
      window.removeEventListener("keydown", (e) =>
        handleKeyDown({
          e,
          canvas: fabricRef.current,
          undo,
          redo,
          syncShapeInStorage,
          deleteShapeFromStorage,
        })
      );
    };
  }, [canvasRef]); // run this effect only once when the component mounts and the canvasRef changes

  // render the canvas when the canvasObjects from live storage changes
  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects]);

  return (
    <main className='h-screen overflow-hidden'>
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}

        imageInputRef={imageInputRef}
        handleImageUpload={(e: any) => {
          // prevent the default behavior of the input element
          e.stopPropagation();

          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef as any,
            shapeRef,
            syncShapeInStorage,
          });
        }}
      />

      <section className='flex h-full flex-row'>
        <LeftSidebar allShapes={Array.from(canvasObjects)} />

        <Live canvasRef={canvasRef} undo={undo} redo={redo} />

        <RightSidebar
          elementAttributes={elementAttributes}
          setElementAttributes={setElementAttributes}
          fabricRef={fabricRef}
          isEditingRef={isEditingRef}
          activeObjectRef={activeObjectRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  );
};

export default Home;