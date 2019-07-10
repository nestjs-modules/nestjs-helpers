import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import * as _ from 'lodash';

import { PaginatorDto } from '../dtos';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AtobPipe } from './atob.pipe';
import { JsonParsePipe } from './json-parse.pipe';

@Injectable()
export class PaginatorPipe
    implements PipeTransform<string, Promise<PaginatorDto>> {
    async transform(
        value: string,
        metadata: ArgumentMetadata
    ): Promise<PaginatorDto> {
        if (_.isEmpty(value)) {
            throw new BadRequestException('paginator not exists');
        }

        const object = plainToClass(
            PaginatorDto,
            new JsonParsePipe().transform(new AtobPipe().transform(value))
        );

        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return _.pick(object, ['skip', 'take']);
    }
}
