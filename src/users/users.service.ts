import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UUID } from "crypto";
import { CreateUserDto } from "src/dto/CreateUserDTO";
import { PrismaService } from "src/infra/prisma.service";
import { UpdateUserDTO } from "src/dto/UpdateUserDTO";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const userAlreadyExists = await this.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }else {
        const user = {
            ...data,
            password: await bcrypt.hash(data.password, 10),
        };
        const create =  this.prisma.user.create({ data: user });

        return {
            ...create,
            password: undefined,
        };
    }

    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({ where: { email } });
    }

    async findId(id: UUID): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        
        return user;
    }

    async update(id: UUID, data: CreateUserDto): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async updatePatch(id: UUID, data: UpdateUserDTO): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async delete(id: UUID) {
        
        const user = await this.prisma.user.findFirst({ where: { id } });
        
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        } else {
            
            await this.prisma.user.delete({ where: { id } });
            return { message: 'Usuário excluído com sucesso' };
        }
    }

    
}

export default UsersService;
