/* @flow */

import React, { Component, Children } from 'react';

import { JobcardContainer, CustomLink } from '../../Style/Application/JobCardStyle';

class JobCard extends Component <Props> {
  renderLinkChild = () => {
    const { children, targetUrl, ...defaultProps } = this.props;
    const linkChild = Children.map(children, (child) => {
      if (targetUrl && child.props.isLinkAble) {
        return React.cloneElement(child, { ...defaultProps });
      }
      return null;
    });
    return linkChild;
  }

  renderNonLinkChild = () => {
    const { children } = this.props;
    const nonLinkChild = Children.map(children, (child) => {
      if (!child.props.isLinkAble) {
        return child;
      }
      return null;
    });
    return nonLinkChild;
  }

  render() {
    const {
      children,
      className,
      targetUrl,
      ...defaultProps
    } = this.props;
    return (
      <JobcardContainer
        className={className}
        role="presentation"
        aria-label="Job Card"
        tabIndex={0}
        {...defaultProps}
      >
        <Choose>
          <When condition={targetUrl}>
            <CustomLink to={targetUrl} target="_blank">
              { this.renderLinkChild() }
            </CustomLink>
            { this.renderNonLinkChild() }
          </When>
          <Otherwise>
            { this.renderNonLinkChild() }
          </Otherwise>
        </Choose>
      </JobcardContainer>
    );
  }
}

type Props = {
  children: React$Node,
  className: string,
  targetUrl: String,
}

export default JobCard;
