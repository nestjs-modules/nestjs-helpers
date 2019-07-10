import { PaginatorPipe } from './paginator.pipe';
import { PaginatorDto } from '../dtos';

describe('PaginatorPipe', () => {
    it('should be defined', () => {
        expect(new PaginatorPipe()).toBeDefined();
    });

    it('should return paginator', async () => {
        await new PaginatorPipe().transform({ take: '10', skip: '0' }, null);
    });
});
