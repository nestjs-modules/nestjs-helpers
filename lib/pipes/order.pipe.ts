import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import * as _ from 'lodash';

import { JsonParsePipe } from './json-parse.pipe';
import { AtobPipe } from './atob.pipe';
import { OrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderPipe implements PipeTransform<string, OrderDto> {
    transform(value: string, metadata: ArgumentMetadata): OrderDto {
        if (_.isEmpty(value)) {
            throw new BadRequestException('order not exists');
        }

        const object = new JsonParsePipe().transform(
            new AtobPipe().transform(value)
        );

        Object.keys(object).forEach(key => {
            if (object[key] !== 'ASC' && object[key] !== 'DESC') {
                throw new BadRequestException(
                    `order by "${key}" - ${object[key]}`
                );
            }
        });

        return object;
    }
}
