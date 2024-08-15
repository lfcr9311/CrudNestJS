import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateUserDto } from 'src/dto/CreateUserDTO';
import { UsersService } from './users.service';
import { UpdateUserDTO } from 'src/dto/UpdateUserDTO';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}
    
    @Get()
    @HttpCode(200)
    findAll(){
        return this.service.findAll()
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id:UUID){
        const user = await this.service.findId(id)
            console.log(user)
            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }
            return user;
    }

    @Get('email/:email')
    @HttpCode(200)
    async findByEmail(@Param('email') email:string){
        const user = await this.service.findByEmail(email)
            console.log(user)
            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }
            return user;
    }


    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto) {
            throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST)
        }
        return this.service.create(createUserDto)
    }

    //troca só o que for passado
    @Patch(':id')
    @HttpCode(200)
    updatePatch(@Param('id') id:UUID, @Body() UpdateUserDTO: UpdateUserDTO){
        return this.service.updatePatch(id, UpdateUserDTO)
    }

    //troca tudo
    @Put(':id')
    @HttpCode(200)
    updatePut(@Param('id') id:UUID, @Body() createUserDto: CreateUserDto){
        return this.service.update(id, createUserDto)
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id:UUID){
       return this.service.delete(id)
    }

}
