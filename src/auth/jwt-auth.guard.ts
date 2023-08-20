/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  12/06/2022                             #
// ###########################################

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
