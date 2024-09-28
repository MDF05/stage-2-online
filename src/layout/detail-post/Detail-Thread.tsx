import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Text,
  Grid,
  Input,
} from "@chakra-ui/react";
import avatarImage from "../../../assets/image/avatar.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbMessage2 } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

import detailDatePost from "../../utils/detail-date-post";
import ModalPost from "../../component/Modal-Post";
import ListThreads from "./../../features/base/components/List-Thread";
import useDetailThreads from "./hooks/use-detail-thread";

export default function DetailThread() {
  const { thread, onOpen, navigate } = useDetailThreads();
  return (
    <Container color="white" p="0 0 50px 0 ">
      <ModalPost></ModalPost>

      <Flex height="50px" width="100%" alignItems="end" ps="20px">
        <Flex
          as="button"
          alignItems="center"
          gap="10px"
          onClick={() => navigate(-1)}
        >
          <Icon as={FaArrowLeftLong} />
          <Text textTransform="capitalize">back</Text>
        </Flex>
      </Flex>
      <Flex
        paddingTop="30px"
        flexDirection="column"
        gap="15px"
        borderBottom="1px solid grey"
        p="20px 20px"
      >
        <Box display="flex" gap="20px">
          <Image
            src={thread?.profile.image}
            rounded="full"
            width="40px"
            height="40px"
          ></Image>
          <Flex flexDirection="column">
            <Text textTransform="capitalize">{thread?.profile.fullName}</Text>
            <Text color="grey">{thread?.profile.username}</Text>
          </Flex>
        </Box>
        <Grid gap={"10px"}>
          <Text>{thread?.text}</Text>
          {thread?.image && (
            <Image
              src={`http://localhost:3000/assets/${thread?.image}`}
              alt={`thread-${thread.id}`}
              maxW={"100%"}
            ></Image>
          )}
        </Grid>
        <Box color="grey" display="flex" gap="5px">
          <Flex>{detailDatePost(thread?.createdAt as string)[0]}</Flex>
          <Flex>● </Flex>
          <Flex>{detailDatePost(thread?.createdAt as string)[1]}</Flex>
        </Box>
        <Flex gap="20px" color="grey">
          <Flex gap="5px">
            <Icon
              as={FaHeart}
              fontSize="1.5rem"
              color="red"
              cursor="pointer"
            ></Icon>
            {/* <Icon as={FaRegHeart} fontSize="1.5rem" color="grey" cursor="pointer"></Icon> */}
            <Text>{thread?._count.like}</Text>
          </Flex>
          <Flex gap="5px">
            <Icon
              as={TbMessage2}
              fontSize="1.5rem"
              color="grey"
              cursor="pointer"
            ></Icon>
            <Text>{thread?._count.replies} Replies</Text>
          </Flex>
        </Flex>
      </Flex>
      <Box borderBottom="1px solid grey" p="20px">
        <Flex width="100%" as={"form"}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" gap="20px" alignItems="center" w={"100%"}>
              <Image src={avatarImage}></Image>
              <Input
                color="grey"
                border={"none"}
                placeholder="Type your reply!"
                _focusVisible={{ border: "none" }}
                overflow={"hidden"}
                w="100%"
              ></Input>
            </Box>
            <Box display="flex" alignItems="center" gap="20px">
              <Icon
                as={LuImagePlus}
                color="brand.color"
                fontSize="2rem"
                rounded="full"
                cursor={"pointer"}
                onClick={onOpen}
              ></Icon>
              <Button
                bg="brand.background-disabled"
                borderRadius="full"
                px="20px"
                py="0px"
                h="30px"
                color="white"
                display="flex"
                alignItems="center"
                type="submit"
              >
                reply
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>

      {thread?.replies && <ListThreads threads={thread?.replies}></ListThreads>}
    </Container>
  );
}
