import styled from 'styled-components';
import { PrimaryColor, SecondaryColor } from '../Colors';

export const AutoCompleteContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .see-password {
    position: absolute;
    display: flex;
    right: 1em;
    cursor: pointer;
  }
`;

export const AutoCompleteLabel = styled.label`
  position: absolute;
  left: ${({ small }) => small ? '16px' : '22px'};
  background: ${SecondaryColor.white};
  color: ${({ floating }) => floating ? `${SecondaryColor.black}` : `${SecondaryColor.lightblack}`};
  transition: all .2s;
  pointer-events: none;
  font-weight: 300;
  font-size: 1.1em;
  
  ${({ floating }) => {
    if (floating) {
      return `
        padding: 0 5px;
        top: 1em;
        transform: translate3d(-15px, -20px, 0);
        transition: all .2s;
        font-size: 12px;
      `;
    }
  }}
  
  ${({ floating, small }) => {
    if (floating && small) {
      return `
        transform: translate3d(-10px, -20px, 0);
      `;
    }
  }}

  ${({ status, floating }) => {
    if (status === 'error' && floating) {
      return `
        color: ${PrimaryColor.glintsred};
      `;
    }
  }}
`;

export const AutoCompleteInput = styled.input`
  position: relative;
  width: 100%;
  border: none;
  outline: none;
  font-size: ${({ small }) => small ? '1em' : '1.1em'};
  line-height: 1.5;
  padding: ${({ small }) => small ? '13px 15px' : '15px 20px'};
  border: ${({ status }) => status === 'error' ? `2px solid ${PrimaryColor.glintsred}` : `2px solid ${SecondaryColor.lightblack}`};
  transition: all .5s;

  ${({ status, floating }) => {
    if (status === 'error') {
      if (floating) {
        return `
          border: 2px solid ${PrimaryColor.glintsred};
        `;
      }
    }
  }}
    

  &:disabled {
    cursor: not-allowed;
    background: ${SecondaryColor.whitesmoke};

    + ${AutoCompleteLabel} {
      background: transparent;
      color: ${SecondaryColor.grey};
    }

    &:hover {
      border: 2px solid ${SecondaryColor.lightgrey};
    }
  }

  &:hover {
    border: 2px solid ${SecondaryColor.actionblue};
    transition: all .5s;

    ${({ status }) => {
    if (status === 'error') {
      return `
          border: 2px solid ${PrimaryColor.glintsred};
        `;
    }
  }}

    + ${AutoCompleteLabel} {
      color: ${SecondaryColor.black};

      ${({ status }) => {
    if (status === 'error') {
      return `
          color: ${PrimaryColor.glintsred};
        `;
    }
  }}
    }
  }

  &:focus {
    border: 2px solid ${SecondaryColor.actionblue};

    ${({ status }) => {
    if (status === 'error') {
      return `
          border: 2px solid ${PrimaryColor.glintsred};
        `;
    }
  }}

    + ${AutoCompleteLabel} {
      padding: 0 5px;
      top: 1em;
      transform: ${({ small }) => small ? 'translate3d(-10px, -20px, 0)' : 'translate3d(-15px, -20px, 0)'};
      transition: all .2s;
      color: ${SecondaryColor.black};
      font-size: 12px;

      ${({ status }) => {
    if (status === 'error') {
      return `
          color: ${PrimaryColor.glintsred};
        `;
    }
  }}
    }
  }
`;
