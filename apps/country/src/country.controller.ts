import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './country.model';

@Controller()
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @MessagePattern('createManyCountry')
    async createMany(@Payload() createCountryDtoArray: CreateCountryDto[]) {
        return await this.countryService.createMany(createCountryDtoArray);
    }

    @MessagePattern('createCountry')
    async create(@Payload() createCountryDto: CreateCountryDto) {
        return await this.countryService.create(createCountryDto);
    }

    @MessagePattern('findAllCountry')
    async findAll() {
        return await this.countryService.findAll();
    }

    @MessagePattern('findOneCountry')
    async findOne(@Payload() id: number) {
        return await this.countryService.findOne(id);
    }

    @MessagePattern({ cmd: 'findOneByNameCountry' })
    async findOneByName(@Payload() name: string): Promise<Country> {
        return await this.countryService.findByname(name);
    }

    @MessagePattern('updateCountry')
    async update(@Payload() updateCountryDto: UpdateCountryDto) {
        return await this.countryService.update(
            updateCountryDto.id,
            updateCountryDto,
        );
    }

    @MessagePattern('removeCountry')
    async remove(@Payload() id: number) {
        return await this.countryService.remove(id);
    }

    @MessagePattern({ cmd: 'getCountriesByNames' })
    async getStaffByNamesHandle(
        @Payload() names: string[],
    ): Promise<Country[]> {
        return await this.countryService.getCountriesByNamesArray(names);
    }
}
