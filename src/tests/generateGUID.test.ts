import { generateGUID } from '../utils/generateGUID';

describe('GUID Generator', () => {
    it('should generate a valid GUID', () => {
        const guid = generateGUID();
        expect(guid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        );
    });
});
