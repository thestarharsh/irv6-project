import fetchNotes from "./fetchNotes";
import TeacherClient from "./TeacherClient";

export default async function TeacherPage() {
  const initialNotes = await fetchNotes();
  return <TeacherClient initialNotes={initialNotes} fetchNotes={fetchNotes} />;
}
