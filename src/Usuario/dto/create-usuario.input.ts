/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsuariosInput {
  ids?: string;
  user_id?: string;
  nome?: string;
  user_company?: string;
  email?: string;
  password?: string;
  senha?: string;
  telefone?: string;
  cpf?: string;
  firstname?: string;
  lastname?: string;
  user_name?: string;
  user_register?: string;
  user_password?: string;
  user_mail?: string;
  user_phone?: string;
  user_cpf?: string;
  user_pos_id?: string;
  user_levelaccess?: string;
  user_acreditacion?: string;
  user_apikeymobile?: string;
  user_servername?: string;
  user_devicestatus?: string;
  user_keyprivate?: string;
  user_apikeyhardware?: string;
  user_apikeysoftware?: string;
  user_messages?: string;
  user_passwordremote?: string;
  user_groupusers?: string;
  user_issync?: string;
  user_uniqueid?: string;
  user_vpa_id?: string;
  user_key?: string;
  user_name_register?: string;
  user_status?: string;
  user_locked?: string;
  user_key_hardware?: string;
  user_level_access?: string;
  user_vpa: string;
  user_token?: string;
  user_public_key?: string;
  user_private_key?: string;
  user_wallet_id?: string;
  user_system_type?: string;
  user_mail_verify?: string;
  user_phone_verify?: string;
  user_professional_type?: string;
  user_gender?: string;
  user_born_date?: string;
  user_nation?: string;
  user_photo_ci?: string;
  user_photo?: string;
  user_bank_name?: string;
  user_bank_user_name?: string;
  user_bank_account?: string;
  user_bank_agency?: string;
  user_bank_user_cpf?: string;
  user_date_register?: string;
  user_otp_verify?: string;
  user_issinc?: string;
  user_latitude?: string;
  user_longitude?: string;
  user_coordinates?: string;
  user_number_services?: string;
  Status?: string;
  servicos?: string;
  counter?: any;
}
