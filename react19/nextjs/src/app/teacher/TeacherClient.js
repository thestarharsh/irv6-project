"use client";
import { useEffect, useState } from "react";

export default function TeacherClientPage({ fetchNotes, initialNotes }) {
  const [notes, setNotes] = useState(initialNotes ?? []);

  useEffect(() => {
    const interval = setInterval(async () => {
      let since;
      if (notes?.length) {
        since = notes[notes.length - 1]?.id ?? null;
      }
      const newNotes = await fetchNotes(since);
      setNotes((prevNotes) => [...prevNotes, ...newNotes]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Teacher&apos;s View</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <fieldset>
              <h2>
                from: {note.from_user} | to: {note.to_user}
              </h2>
              <p>{note.note}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
