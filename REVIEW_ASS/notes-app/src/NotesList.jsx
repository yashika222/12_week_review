import { useSelector, useDispatch } from "react-redux";
import { togglePin } from "./store";

export default function NotesList() {
  const { items, loading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <h2>My Notes</h2>

      {items.map((note) => (
        <div className="note" key={note.id}>
          <span>{note.text}</span>

          <button
            onClick={() => dispatch(togglePin(note.id))}
            aria-label={`Pin ${note.text}`}
          >
            {note.pinned ? "Unpin" : "Pin"}
          </button>

          {note.pinned && <span>Pinned</span>}
        </div>
      ))}
    </div>
  );
}