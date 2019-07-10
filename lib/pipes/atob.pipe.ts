import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as atob from 'atob';

@Injectable()
export class AtobPipe implements PipeTransform<string, string> {
    transform(value: string, metadata?: ArgumentMetadata): string {
        return atob(value);
    }
}
