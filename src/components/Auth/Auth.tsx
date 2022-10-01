/* eslint-disable jsx-a11y/alt-text */
import {useMutation} from '@apollo/client'
import { Session } from "next-auth";
import {Center, Stack, Text, Button, Image, Input} from '@chakra-ui/react'
import { signIn } from "next-auth/react";
import { useState } from "react";
import UserOperations from '../../graphql/operations/user'
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';

interface IAuthProps {
    session: Session | null
    reloadSession: () => void
}

const Auth: React.FunctionComponent<IAuthProps> = ({session, reloadSession}) => {
    const [username, setUsername] = useState("")

    const [createUsername, {data, loading, error}] = useMutation<
    CreateUsernameData, 
    CreateUsernameVariables
    >(UserOperations.Mutations.createUsername)

    console.log('HERE IS DATA', data, loading, error)

    const onSubmit = async () => {
        if (!username) return
        try {
            await createUsername({variables: {username}})
        } catch (error) {
            console.log("onSubmit error", error)
        }
    }

    return (
        <Center height='100vh'>
            <Stack spacing={8} align='center'>
                {session ? (
                    <>
                        <Text fontSize="3xl">Create a Username</Text>
                        <Input placeholder='Enter a username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Button width='100%' onClick={onSubmit}>Save</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize='3xl'>ChatBoxQL</Text>
                        <Button onClick={() => signIn('google')} leftIcon={<Image height='20px' src='/images/googlelogo.png'/>}>Contine with Google</Button>
                    </>
                )}
            </Stack>
        </Center>
    )
};

export default Auth;
