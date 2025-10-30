import { AsyncDatabase } from "promised-sqlite3";
import path from "node:path";

export default async function MyNotes() {
  console.log("Rendering MyNotes server component");
  async function fetchNotes() {
    console.log("Fetching notes from server component");
    const dbPath = path.resolve(__dirname, "../notes.db");
    const db = await AsyncDatabase.open(dbPath);
    const from = await db.all(
      "SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user WHERE from_user = ?",
      ["1"]
    );
    return {
      from,
    };
  }

  const notes = await fetchNotes();
  return (
    <fieldset>
      <legend>My Server Component Notes</legend>
      <div>
        <table>
          <thead>
            <tr>
              <th>Note</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {notes.from.map((note) => (
              <tr key={note.id}>
                <td>{note.note}</td>
                <td>{note.from_user}</td>
                <td>{note.to_user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}
