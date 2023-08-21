// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  12/06/2022                             #
// ###########################################

export interface UsuariosCadastrarDto {
  nome?: string;
  email: string;
  senha?: string;
  password?: string;
  telefone?: string;
  cpf?: string;
  user_id?: string;
  user_company?: string;
  user_name_register?: string;
  user_status?: string;
  user_locked?: string;
  user_key_hardware?: string;
  user_level_access?: string;
  user_vpa?: string;
  user_token?: string;
  user_public_key?: string;
  user_private_key?: string;
  user_wallet_id?: string;
  user_system_type?: string;
  Status?: string;
}

export interface UsuariosLoginDto {
  email: string;
  password: string;
}
