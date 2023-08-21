/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import { CreateUsuariosInput } from './create-usuario.input';
import { InputType, PartialType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUsuariosInput extends PartialType(CreateUsuariosInput) {
  @Field(() => Int)
  id: number;
}
