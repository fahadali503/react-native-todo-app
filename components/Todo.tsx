import { useState } from 'react'
import { Box, Icon, Fab, Heading, FlatList, HStack, VStack, Text, Spacer, Checkbox } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TodoForm } from './TodoForm';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store';
import { completeTodo, removeTodo } from '../store/todo.slice';

export function Todos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const state = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    return <Box h={"full"}>
        <TodoForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Heading fontSize="xl" p="4" pb="3">
            Todos
        </Heading>
        <FlatList paddingX={"4"} data={state.todos} renderItem={({
            item
        }) => <Box key={item.id} borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
        }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                        <Text textDecorationLine={item.isCompleted ? "line-through" : "none"} _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {item.title}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {item.description}
                        </Text>
                    </VStack>
                    <Spacer />
                    {!item.isCompleted ?
                        <Checkbox onChange={() => dispatch(completeTodo(item.id))} value='' aria-label='Complete' /> :
                        <Icon onPress={() => dispatch(removeTodo(item.id))} color="red.500" name="trash-outline" as={Ionicons} size="8" />
                    }
                </HStack>
            </Box>} keyExtractor={(item) => item.id} />


        <Fab onPress={() => setIsModalOpen(true)} renderInPortal={false} shadow={2} placement="bottom-right" size="sm" colorScheme={"green"} icon={<Icon color="white" name="add-outline" as={Ionicons} size="8" />} />
    </Box>
}