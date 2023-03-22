import { Box, Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react';
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = React.useCallback((path: string) => {
    console.log('path', path);
    navigate(path)
  }, []);

  return (
    <Box>
      <Card maxW="300px">
        <CardBody>
          <Image src="https://eladnava.com/content/images/2015/11/js-6.jpg" />
          <Heading onClick={() => handleNavigate('/sourcemap')} size="md" mt={6} transition="all 0.3s ease-in-out" cursor="pointer" _hover={{ color: 'green.600' }}>SourceMap工具</Heading>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Home
