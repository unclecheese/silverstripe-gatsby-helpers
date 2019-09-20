import { RawAttribute, NormalisedAttributes, FormHash } from '../_types';

const normaliseAttributes = (attributes: RawAttribute[]): NormalisedAttributes => {
    const normalised = attributes.reduce((atts: FormHash, { name, value}) => {
        if (name === 'class') {
            return atts;
        }
        atts[name] = value;

        return atts;
    }, {});

    return normalised;
};

export default normaliseAttributes;