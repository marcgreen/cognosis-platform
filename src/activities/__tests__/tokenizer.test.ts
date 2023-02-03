import { split_text_by_tokens } from '../tokenizer';

// source of truth for these tests: https://platform.openai.com/tokenizer?view=bpe

describe("split_text_by_tokens", () => {
  test("empty text", async () => {
    expect(await split_text_by_tokens("", 10)).toEqual([])
  })
});

describe("split_text_by_tokens", () => {
  test("chunk size 0 with empty text", async () => {
    expect(await split_text_by_tokens("", 0)).toEqual([])
  })
});

describe("split_text_by_tokens", () => {
  test("1 token chunking without overlap", async () => {
    expect(await split_text_by_tokens("Hello world! This is a test.", 1)).toEqual(
      ["Hello", " world", "!", " This", " is", " a", " test", "."])
  })
});

describe("split_text_by_tokens", () => {
  test("2 token chunking without overlap; odd number of chunks", async () => {
    expect(await split_text_by_tokens("Hello world! This is still a test.", 2)).toEqual(
      ["Hello world", "! This", " is still", " a test", "."])
  })
});

describe("split_text_by_tokens", () => {
  test("whitespace", async () => {
    expect(await split_text_by_tokens(" \n ", 1)).toEqual([" ", "\n", " "])
  })
});

describe("split_text_by_tokens", () => {
  test("chunking with overlap", async () => {
    expect(await split_text_by_tokens("Hello world! This is a test.", 2, 1)).toEqual(
      ["Hello world", " world!", "! This", " This is", " is a", " a test", " test.", "."]) // TODO is this what we want?
  })
});

// TODO test cases inspo: https://github.com/jerryjliu/gpt_index/blob/main/tests/langchain_helpers/test_text_splitter.py
// test chunk overlap larger than chunk size throws error
// test chunk overlap equal to chunk size throws error
// test chunk size longer than text
// test chunk overlap longer than text but smaller than chunk size
//   this one is redundant. but i think there might be more edges to test?
// test text is shorter than chunk size but longer tha chunk size - chunk overlap
