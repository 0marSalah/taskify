import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskCard from '../components/TaskCard';
import '@testing-library/jest-dom';

type InputType = HTMLInputElement | HTMLTextAreaElement;

describe('TaskCard Component', () => {
  const sampleTask = {
    id: 'task1',
    name: 'Sample Task',
    status: 'TODO'
  };

  it('allows task name to be changed', () => {
    render(<TaskCard task={sampleTask} setProject={() => {}} />);

    // Check if the task name input is rendered with the correct value
    const input: InputType = screen.getByDisplayValue('Sample Task');
    expect(input).toBeInTheDocument();

    // Simulate user changing the task name
    fireEvent.change(input, { target: { value: 'Updated Task' } });

    // Check if the input value is updated
    expect(input.value as string).toBe('Updated Task');
  });
});
