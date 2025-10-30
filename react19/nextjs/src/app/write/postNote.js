"use server";

import { AsyncDatabase } from "promised-sqlite3";

export default async function postNote(formData) {
  const from_user = formData.get("from_user");
  const to_user = formData.get("to_user");
  const note = formData.get("note");

  if (!from_user || !to_user || !note) {
    throw new Error("All fields are required");
  }

  const db = await AsyncDatabase.open("./notes.db");
  await db.run(
    "INSERT INTO notes (from_user, to_user, note) VALUES (?, ?, ?)",
    [from_user, to_user, note]
  );
}
