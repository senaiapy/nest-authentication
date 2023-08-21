// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

export type Usuarios = {
  id: number;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
};

export type Comment = {
  id: number;
  usuario_id: any;
  body: string;
  created_at: number;
  updated_at: number;
};

export type Database = {
  usuarios: Record<number, Usuarios>;
  comments: Record<number, Comment>;
};

export type Dump = {
  usuarios: Usuarios[];
  comments: Comment[];
};
