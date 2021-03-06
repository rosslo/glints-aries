import * as React from 'react';

import StorybookComponent from '../StorybookComponent';
import { StorybookTable } from '../StorybookTable';
import { Shadow, ShadowKeyType } from '../../src/Utils/Shadow';
import styled from 'styled-components';

import { Box } from '../../src/Layout/Box';

type Data = {
  level: number;
  value: number;
  usage: string;
};

const ShadowBox = styled(Box)`
  background: '#fff';
  height: 60px;
  width: 60px;
`;

const dataSource = [
  {
    level: 1,
    usage: 'Elements that uses shadow by default',
  },
  {
    level: 2,
    usage: 'Elements in hovered state',
  },
  {
    level: 3,
    usage: 'Sticky elements, dropdown elements',
  },
  {
    level: 4,
    usage: 'Alerts',
  },
];

const columns = [
  { title: 'Elevation level', dataIndex: 'level' },
  {
    title: 'Value',
    dataIndex: 'value',
    // eslint-disable-next-line react/display-name
    render: ({ level }: Data) => {
      const up = Shadow[`up${level}` as ShadowKeyType];
      const down = Shadow[`down${level}` as ShadowKeyType];

      return (
        <div>
          <div>
            down: <code>{down}</code>
          </div>
          <Box mt={16}>
            up: <code>{up}</code>
          </Box>
        </div>
      );
    },
  },
  {
    title: 'Example of shadow down',
    dataIndex: 'example',
    // eslint-disable-next-line react/display-name
    render: ({ level }: Data) => (
      <ShadowBox boxShadow={Shadow[`down${level}` as ShadowKeyType]} />
    ),
  },
  {
    title: 'Recommended usage',
    dataIndex: 'usage',
  },
];

const usage = `import { Shadow, Box } from 'glints-aries';

// use with Box component
<Box boxShadow={Shadow.down1} />

// use with box-shadow property
const Card = styled.div\`
  box-shadow: \$\{Shadow.down1\};
\`
`;

const ShadowStory = () => (
  <StorybookComponent
    title="Shadow"
    code="import { Shadow } from 'glints-aries'"
    usage={usage}
  >
    <StorybookTable dataSource={dataSource} columns={columns} />
  </StorybookComponent>
);

export default ShadowStory;
