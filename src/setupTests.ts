import { TextEncoder, TextDecoder } from 'util';

// Instead of using `any`, use the `globalThis` type and cast the properties explicitly
(globalThis as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(globalThis as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;

import '@testing-library/jest-dom';
