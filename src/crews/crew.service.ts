import { Injectable } from '@nestjs/common';
import { UpdateCrewDto } from './dto/update-crew.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICrew } from './crew.interfaces';
import { CreateCrewDto } from './dto/create-crew.dto';

@Injectable()
export class CrewService {
  constructor(@InjectModel('Crew') private crewModel: Model<ICrew>) {}
  async createCrew(createCrewDto: CreateCrewDto) {
    return await this.crewModel.create(createCrewDto);
  }

  findAll() {
    return `This action returns all crew`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crew`;
  }

  findByName(name: string) {
    const crew = this.crewModel.findOne({ name });

    return crew || null;
  }

  update(id: number, updateCrewDto: UpdateCrewDto) {
    return `This action updates a #${id} crew`;
  }

  remove(id: number) {
    return `This action removes a #${id} crew`;
  }
}
