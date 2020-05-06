import { ErrorProps } from "next/error";
import { Text } from "@chakra-ui/core";

const Error: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <Text>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </Text>
  )
}

export default Error;