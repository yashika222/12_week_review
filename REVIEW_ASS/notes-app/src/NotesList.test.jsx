import { describe, it, expect } from "vitest";
import { render,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Profiler } from "react";
import NotesList from "./NotesList";
import { notesReducer } from "./store";

async function setup(loading = false) {
  const store = await configureStore({
    reducer: { notes: notesReducer },
    preloadedState: {
      notes: {
        loading,
        items: [
          { id: 1, text: "React", pinned: false },
          { id: 2, text: "Redux", pinned: false },
        ],
      },
    },
  });

  return render(
    <Provider store={store}>
      <NotesList />
    </Provider>
  );
}

describe("NotesList Tests", () => {
  it("shows notes", () => {
    setup();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
  });

  it("shows loading", () => {
    setup(true);
    expect(screen.getByText("Loading notes...")).toBeInTheDocument();
  });

  it("checks Profiler duration under 16ms", () => {
    let duration = 0;

    render(
      <Provider store={configureStore({
        reducer: { notes: notesReducer }
      })}>
        <Profiler onRender={(id, phase, actualDuration) => {
          duration = actualDuration;
        }}>
          <NotesList />
        </Profiler>
      </Provider>
    );

    expect(duration).toBeLessThan(16);
  });

});