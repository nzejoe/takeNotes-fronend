import React from "react";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";

const Content = () => {
  return (
    <div>
      <aside>
        <LabelList />
      </aside>
      <main>
        <NoteList />
      </main>
    </div>
  );
};

export default Content;
