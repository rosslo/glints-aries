import * as React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select, { Props } from './Select';

describe('<Select disableTyping> onBlur', () => {
  const SelectComponent = (props: Omit<Props, 'children'>) => (
    <Select label="disableTyping-onBlur" disableTyping={true} {...props}>
      <Select.Option value="option">option</Select.Option>
    </Select>
  );

  it('should call onBlur when close menu', () => {
    const onBlurSpy = jest.fn();

    const { queryByRole, queryByTestId } = render(
      <SelectComponent onBlur={onBlurSpy} />
    );
    const selectInput = queryByRole('combobox') as HTMLInputElement;
    const selectList = queryByTestId('listbox');
    const dropIcon = document.querySelector('.select-icon');

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(true);

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(1);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(true);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(2);

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(true);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(3);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(true);

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(4);
  });

  it('should call onBlur when click outside', () => {
    const onBlurSpy = jest.fn();
    const Component = () => (
      <React.Fragment>
        <SelectComponent onBlur={onBlurSpy} />
        <div>outside</div>
      </React.Fragment>
    );

    const { queryByRole, queryByTestId, queryByText } = render(<Component />);
    const selectInput = queryByRole('combobox') as HTMLInputElement;
    const selectList = queryByTestId('listbox');
    const outside = queryByText('outside');
    const dropIcon = document.querySelector('.select-icon');

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(true);

    act(() => {
      userEvent.click(outside);
    });
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(1);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(true);

    act(() => {
      userEvent.click(outside);
    });
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(2);
  });

  it('should call onBlur when click option', () => {
    const onBlurSpy = jest.fn();

    const { queryByRole, queryByTestId } = render(
      <SelectComponent onBlur={onBlurSpy} />
    );
    const selectInput = queryByRole('combobox') as HTMLInputElement;
    const option = queryByTestId('option');
    const selectList = queryByTestId('listbox');
    const dropIcon = document.querySelector('.select-icon');

    fireEvent.click(selectInput);
    expect(selectList.hasAttribute('open')).toEqual(true);

    userEvent.click(option);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(1);

    userEvent.click(dropIcon);
    expect(selectList.hasAttribute('open')).toEqual(true);

    userEvent.click(option);
    expect(selectList.hasAttribute('open')).toEqual(false);
    expect(onBlurSpy).toHaveBeenCalledTimes(2);
  });
});
