/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../common/swagger/constants/dto.js';
import { ActionType } from '../../database/entities/ChangeLog.js';

export class ChangeLogDto {
    @ApiProperty({
        example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER,
    })
    id: number;

    @ApiProperty({
        example: DTO_CONSTANTS.CHANGELOG_ACTION_TYPE_EXAMPLE,
        enum: ActionType,
    })
    actionType: ActionType;

    @ApiProperty({
        example: DTO_CONSTANTS.CHANGELOG_ENTITY_EXAMPLE,
    })
    entity: string;

    @ApiProperty({
        example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER,
    })
    referenceId: string;

    @ApiProperty({
        example: DTO_CONSTANTS.CHANGELOG_NEW_DATA_EXAMPLE,
    })
    newData: Record<string, any>;

    @ApiProperty({
        example: DTO_CONSTANTS.CHANGELOG_CHANGE_DATE_EXAMPLE,
    })
    changeDate: Date;
}
