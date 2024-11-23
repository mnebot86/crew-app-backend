import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateCrewDto } from './dto/create-crew.dto';
import { UpdateCrewDto } from './dto/update-crew.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from 'src/constants/roles';
import { CrewService } from './crew.service';

@Controller('crews')
@UseGuards(AuthGuard('jwt'))
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @UseGuards(RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  async create(
    @Req() request,
    @Res() response,
    @Body() createCrewDto: CreateCrewDto,
  ) {
    const alreadyExists = await this.crewService.findByName(createCrewDto.name);

    if (alreadyExists) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({ message: `Crew ${createCrewDto.name} already exists` });
    }

    const crew = await this.crewService.createCrew(createCrewDto);

    return response.status(HttpStatus.CREATED).json(crew);
  }

  @Get()
  findAll() {
    return this.crewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrewDto: UpdateCrewDto) {
    return this.crewService.update(+id, updateCrewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crewService.remove(+id);
  }
}
