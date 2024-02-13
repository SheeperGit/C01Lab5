const SERVER_URL = "http://localhost:4000";

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toStrictEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Add two notes to db to get later //
  const title = "T";
  const content = "C";

  for (let i = 0; i < 2; i++) {
      await fetch(`${SERVER_URL}/postNote`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              title: title + i,
              content: content + i,
          }),
      });
  }

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2); // Checking length only, ignoring content salinity

  // Clean up //
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
});

test("/deleteNote - Delete a note", async () => {
  // Add a note to db to delete it later //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const noteId = (await postNoteRes.json()).insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Add a note to db to patch it later //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const noteId = (await postNoteRes.json()).insertedId;

  // Patching note... //
  const newTitle = "TT";
  const newContent = "CC";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: newTitle,
          content: newContent,
      }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

  // Clean up //
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
});

test("/patchNote - Patch with just title", async () => {
  // Add a note to db to patch it later //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const noteId = (await postNoteRes.json()).insertedId;

  // Patching note... //
  const newTitle = "TT";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: newTitle,
      }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

  // Clean up //
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
});

test("/patchNote - Patch with just content", async () => {
  // Add a note to db to patch it later //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const noteId = (await postNoteRes.json()).insertedId;

  // Patching note... //
  const newContent = "CC";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          content: newContent,
      }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

  // Clean up //
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
});

test("/deleteAllNotes - Delete one note", async () => {
  // Add a note to db to delete it later //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Add three notes to db to be delete later //
  const title = "T";
  const content = "C";

  for (let i = 0; i < 3; i++) {
      await fetch(`${SERVER_URL}/postNote`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              title: title + i,
              content: content + i,
          }),
      });
  }

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Add a note to db to which we'll update the color! //
  const title = "T";
  const content = "C";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const noteId = (await postNoteRes.json()).insertedId; // updateNoteColor requires a noteId
  const color = "#FF0000";                              // and a color!

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          color: color,
      }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.response).toBe('Note color updated successfully.');

  // (Last) Clean up //
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
});