import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function DateTransform() {
    return applyDecorators(
        Transform(({ value }) => (value ? new Date(value) : value), {
            toClassOnly: true,
        })
    );
}
