import { describe, test, expect, vi } from 'vitest';
import extractIdFromUrl from '../../src/utils/extractIdFromUrl'; // Убедитесь, что путь к функции правильный

describe('extractIdFromUrl function', () => {
  test('extracts ID from a URL with a numeric ID at the end', () => {
    const url = 'https://example.com/items/123';
    const result = extractIdFromUrl(url);
    expect(result).toBe(123);
  });

  test('extracts ID from a URL with a numeric ID before the trailing slash', () => {
    const url = 'https://example.com/items/123/';
    const result = extractIdFromUrl(url);
    expect(result).toBe(123);
  });

  test('returns null for a URL without a numeric ID', () => {
    const url = 'https://example.com/items/abc/';
    const result = extractIdFromUrl(url);
    expect(result).toBeNull();
  });

  test('returns null for a URL with no numeric ID', () => {
    const url = 'https://example.com/items/';
    const result = extractIdFromUrl(url);
    expect(result).toBeNull();
  });

  test('returns null for a URL with an empty string', () => {
    const url = '';
    const result = extractIdFromUrl(url);
    expect(result).toBeNull();
  });

  test('logs error for URL with invalid ID', () => {
    const consoleLog = console.log;
    console.log = vi.fn();

    const url = 'https://example.com/items/invalidId/';
    const result = extractIdFromUrl(url);
    expect(result).toBeNull();
    expect(console.log).toHaveBeenCalledWith(
      'Error extracting ID from URL: Invalid number format',
    );

    console.log = consoleLog;
  });
});
