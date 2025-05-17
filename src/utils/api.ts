import { NextResponse } from 'next/server';

/**
 * Function to handle Next responses
 * @param status Response status code
 * @param message Response message
 * @param details Optional details
 * @returns NextResponse object
 */
export const handleResponse = (status: number, message: string, details?: unknown) =>
  NextResponse.json({ details, error: message }, { status });
