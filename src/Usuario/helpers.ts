// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################
import { Comment, Database, Usuarios } from './typings';

export type CommentPayload = {
  body: string;
};

export const addComment = (
  db: Database,
  usuarioId: number,
  commentPayload: CommentPayload,
) => {
  const id = 1 + Object.keys(db.comments).length;

  const now = Date.now();

  const comment: Comment = {
    id,
    usuario_id: usuarioId,
    body: id + '\n' + commentPayload.body,
    created_at: now,
    updated_at: now,
  };

  db.comments[id] = comment;

  return comment;
};

export type UsuariosPayload = {
  title: string;
  body: string;
  comments?: string[];
};

export const addUsuarios = (db: Database, usuarioPayload: UsuariosPayload) => {
  const id = 1 + Object.keys(db.usuarios).length;

  const now = Date.now();

  const usuario: Usuarios = {
    id,
    title: usuarioPayload.title.toUpperCase() + '!',
    body: id + '\n' + usuarioPayload.body,
    created_at: now,
    updated_at: now,
  };

  db.usuarios[id] = usuario;

  return usuario;
};

export const deleteUsuarios = (db: Database, id: number) => {
  const usuario = db.usuarios[id];

  delete db.usuarios[id];

  return usuario;
};
