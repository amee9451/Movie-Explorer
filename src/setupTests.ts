// import '@testing-library/jest-dom/extend-expect'; Issue while adding

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
import '@testing-library/jest-dom';