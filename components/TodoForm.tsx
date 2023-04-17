import { useState } from "react"
import { Modal, FormControl, Input, Button } from "native-base"
import { useDispatch } from 'react-redux'
import { addTodo } from "../store/todo.slice"
import "react-native-get-random-values"
import { v4 } from 'uuid';

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export function TodoForm({ isOpen, onClose }: Props) {
    const [values, setValues] = useState({ title: "", description: "" });
    const dispatch = useDispatch();

    function handleSubmit() {
        if (values.title.length > 0 && values.description.length > 0) {
            const payload = { ...values, id: v4(), isCompleted: false }
            dispatch(addTodo(payload));
            onClose();
            setValues({ title: "", description: "" })
        }
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Add Todo</Modal.Header>

            <Modal.Body>
                <FormControl>
                    <Input onChangeText={text => setValues({ ...values, title: text })} marginBottom={"3"} variant="underlined" placeholder="Title" size={"lg"}
                        value={values.title}
                    />

                    <Input
                        value={values.description}
                        onChangeText={text => setValues({ ...values, description: text })}
                        variant="underlined" placeholder="Description" size={"lg"} />
                </FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme={"green"} onPress={handleSubmit}>
                        Save
                    </Button>
                </Button.Group>
            </Modal.Footer>
        </Modal.Content>
    </Modal>
}