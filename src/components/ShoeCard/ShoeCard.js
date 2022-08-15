import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          { variant === 'on-sale' &&  <SaleBanner>Sale</SaleBanner>}
          { variant === 'new-release' &&  <NewReleaseBanner>Just Released!</NewReleaseBanner>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ '--color': variant === 'on-sale' ? COLORS.gray[700]: COLORS.gray[900],
          '--text-decoration-line': variant === 'on-sale' ? 'line-through': 'none' }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-weight: ${WEIGHTS.normal};
  color: var(--color);
  text-decoration-line: var(--text-decoration-line);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Banner = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  line-height: 32px;
  padding: 0px 10px;
  border-radius: 2px;
  color: ${COLORS.white}; 
  font-size: 14px;
  font-weight: ${WEIGHTS.bold}; 
`;

const SaleBanner = styled(Banner)`
  background-color: ${COLORS.primary}; 
`;

const NewReleaseBanner = styled(Banner)`
  background-color: ${COLORS.secondary}; 
`;

export default ShoeCard;
