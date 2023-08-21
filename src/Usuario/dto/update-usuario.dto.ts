// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosDto } from './create-usuario.dto';

export class UpdateUsuariosDto extends PartialType(CreateUsuariosDto) {}
