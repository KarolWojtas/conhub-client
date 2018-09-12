import { TrimQuotesPipe } from './trim-quotes.pipe';

describe('TrimQuotesPipe', () => {
  it('create an instance', () => {
    const pipe = new TrimQuotesPipe();
    expect(pipe).toBeTruthy();
  });
});
