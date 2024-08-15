import { HttpCode, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UUID } from "crypto";
import { CreateUserDto } from "src/dto/CreateUserDTO";
import { PrismaService } from "src/infra/prisma.service";
import { UpdateUserDTO } from "src/dto/UpdateUserDTO";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findId(id: UUID): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { id } });
        
        return user;
    }

    async update(id: UUID, data: CreateUserDto): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async updatePatch(id: UUID, data: UpdateUserDTO): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async delete(id: UUID): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({ where: { email } });
    }
}

export default UsersService;
