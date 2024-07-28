import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useLocalStorage from '../../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initially returns empty string if no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage());
    const [query] = result.current;
    expect(query).toBe('');
  });

  test('returns saved value from localStorage', () => {
    localStorage.setItem('searchQuery', 'test query');
    const { result } = renderHook(() => useLocalStorage());
    const [query] = result.current;
    expect(query).toBe('test query');
  });

  test('updates localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage());
    const [, setQuery] = result.current;

    act(() => {
      setQuery('new query');
    });

    expect(localStorage.getItem('searchQuery')).toBe('new query');
  });
});
