import { IsInt, Min } from 'class-validator';

export class PaginatorDto {
    @IsInt()
    @Min(0)
    readonly take: number;

    @IsInt()
    @Min(0)
    readonly skip: number;
}
