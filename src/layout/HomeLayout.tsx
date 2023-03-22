import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import * as React from 'react';

const HomeLayout: React.FC<{ children?: React.ReactNode }> = (props: { children?: React.ReactNode }) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Flex height="60px" px={4} bg="white" borderBottom="1px" borderColor="gray.200">
        <Center>
          <Heading>Kevin's Web Tools</Heading>
        </Center>
      </Flex>
      <Box maxW="1200px" mx="auto" p={10} height="calc(100vh - 60px)">
        {children}
      </Box>
    </React.Fragment>
  )
}

export default HomeLayout
