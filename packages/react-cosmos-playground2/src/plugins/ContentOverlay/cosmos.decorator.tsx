import React from 'react';
import { screenGrey6 } from 'react-cosmos-shared2/ui';
import styled from 'styled-components';

export default ({ children }: { children: React.ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${screenGrey6};
  align-items: center;
  justify-content: center;
`;
