import { Heading, Text, Code, Box, FormControl, FormLabel, Input, FormHelperText, Button, TableContainer, Table, Thead, Tr, Th, Td, useToast, Tbody } from '@chakra-ui/react';
import { useExternal, useGetState } from 'ahooks'
import * as React from 'react'

interface IResult {
  line: string;
  column: string;
  source: string;
  sourceLine: number;
  sourceColumn: number;
  sourceName: string;
}

const SourceMapTool = () => {
  const toast = useToast();

  const status = useExternal('https://unpkg.com/source-map@0.7.3/dist/source-map.js', {
    js: {
      async: true,
    }
  })

  React.useEffect(() => {
    if (status === 'ready') {
      window.sourceMap.SourceMapConsumer.initialize({
        "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm"
      });
    }
  }, [status]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [lineCloumn, setLineCloumn] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [resultList, setResultList, getResultList] = useGetState<IResult[]>([]);

  const handleParse = React.useCallback(() => {
    // 读取文件
    let file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({
        status: 'info',
        description: '请选择一个sourceMap文件',
      });
      return;
    }
    if (!lineCloumn) {
      toast({
        status: 'info',
        description: '行:列输入错误',
      });
      return;
    }

    const [line, column] = lineCloumn.split(':');
    console.log(`行-${line},列-${column}`);

    const fileReader = new FileReader();
    setLoading(true);
    fileReader.onloadend = () => {
      const rawSourceMap = fileReader.result;
      // 查找
      window.sourceMap.SourceMapConsumer.with(rawSourceMap, null, (consumer: any) => {
        const result = consumer.originalPositionFor({
          source: './',
          line: +line,
          column: +column,
        });
        console.log(result);
        const list = getResultList();
        setResultList([
          {
            line,
            column,
            source: result.source,
            sourceLine: result.line,
            sourceColumn: result.column,
            sourceName: result.name
          },
          ...list,
        ]);
      })
      setLoading(false)
    }
    fileReader.readAsText(file);
    return false;
  }, [lineCloumn]);

  return (
    <React.Fragment>
      <Heading as="h2" size="lg">Source-Map 工具</Heading>
      <Text>
        选择线上代码出问题的js文件对应的SourceMap文件后，输入<Code>行:列</Code>之后，点击“确定”按钮
      </Text>
      <Box mt={4}>
        <FormControl>
          <FormLabel>SourceMap文件</FormLabel>
          <Input ref={fileInputRef} type="file" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>行:列</FormLabel>
          <Input placeholder='1:1101' value={lineCloumn} onChange={(e) => setLineCloumn(e.target.value)} />
          <FormHelperText>输入行列，中间用英文“:”隔空，例如“1:1101”</FormHelperText>
        </FormControl>
        <Button isLoading={loading} mt={4} size="lg" onClick={handleParse}>确定</Button>
      </Box>
      <Box mt={6}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>line:column</Th>
                <Th>source</Th>
                <Th>line</Th>
                <Th>column</Th>
                <Th>name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                resultList.map((re, index) => (
                  <Tr key={`${re.line}:${re.column}-${index}`}>
                    <Td>{re.line}:{re.column}</Td>
                    <Td>{re.source}</Td>
                    <Td>{re.sourceLine}</Td>
                    <Td>{re.sourceColumn}</Td>
                    <Td>{re.sourceName}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  )
}

export default SourceMapTool
