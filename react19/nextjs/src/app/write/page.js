import { AsyncDatabase } from "promised-sqlite3";

import postNote from "./postNote";

export default async function WritePage() {
  async function fetchUsers() {
    const db = await AsyncDatabase.open("./notes.db");
    const users = await db.all("SELECT * FROM users");
    return users;
  }

  const users = await fetchUsers();

  return (
    <div>
      <fieldset className="note-fieldset">
        <legend>Write a Note</legend>
        <form action={postNote} className="note-form">
          <label>
            From
            <select name="from_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            To
            <select defaultValue={2} name="to_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Note
            <textarea name="note" />
          </label>
          <button type="submit">Save</button>
        </form>
      </fieldset>
    </div>
  );
}
