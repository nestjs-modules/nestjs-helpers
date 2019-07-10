import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform<string, any> {
    transform(value: string, metadata?: ArgumentMetadata): any {
        return JSON.parse(value);
    }
}
