"use client";

import { createContext, useContext, useState } from "react";

type EditorCtx = {
  isEditor: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
};

const Ctx = createContext<EditorCtx>({
  isEditor: false,
  editMode: false,
  setEditMode: () => {},
});

export const useEditor = () => useContext(Ctx);

export function EditorProvider({
  isEditor,
  children,
}: {
  isEditor: boolean;
  children: React.ReactNode;
}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Ctx.Provider value={{ isEditor, editMode, setEditMode }}>
      {children}
    </Ctx.Provider>
  );
}
