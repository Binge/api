const Note = require('../models/note');

exports.createNote = async (ctx) => {
  const { title, content } = ctx.request.body;

  if (!title || !content) {
    ctx.throw(400, 'Invalid title or content');
  }

  const newNote = new Note({
    title,
    content
  });

  await newNote.save();

  ctx.status = 201;
  ctx.body = {
    message: 'Note created successfully',
    note: newNote
  };
};

exports.updateNote = async (ctx) => {
  const { id } = ctx.params;
  const { title, content } = ctx.request.body;

  if (!title || !content) {
    ctx.throw(400, 'Invalid title or content');
  }

  const note = await Note.findById(id);

  if (!note) {
    ctx.throw(400, 'Note not found');
  }

  note.title = title;
  note.content = content;

  await note.save();

  ctx.status = 200;
  ctx.body = {
    message: 'Note updated successfully',
    note
  };
};