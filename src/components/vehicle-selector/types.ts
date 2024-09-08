import { components } from '@/lib/api';

export type Lookup = components['schemas']['Lookup'];
export type ModelAttributes = components['schemas']['VPICModelAttributesResponseBody'];
export type ModelAttribute = ModelAttributes[number];
export type ModelAttributeValue = ModelAttribute['values'][number];
