import { Module } from '@nestjs/common';
import { RoleService } from './role.service.js';
import { RoleRepository } from './role.repository.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../database/entities/index.js';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService, RoleRepository],
    exports: [RoleService],
})
export class RoleModule {}
