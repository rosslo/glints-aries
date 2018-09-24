/* @flow */

import React from 'react';
import { Container, BrandImage } from '../../Style/BrandStyle';

import GlintsBlack from '../../../assets/image/glints-logo-black.svg';
import GlintsWhite from '../../../assets/image/glints-logo-white.svg';

const Brand = (props: Props) => {
  const {
    asset,
    className,
    alt,
    ...defaultProps
  } = props;

  let srcAsset = '';

  if (asset === 'glints-black') {
    srcAsset = GlintsBlack;
  } else if (asset === 'glints-white') {
    srcAsset = GlintsWhite;
  } else {
    srcAsset = asset;
  }

  return (
    <Container {...defaultProps}>
      <BrandImage className={className} src={srcAsset} alt={alt} />
    </Container>
  );
};

type Props = {
  asset: string,
  className: string,
  alt: string,
}

export default Brand;