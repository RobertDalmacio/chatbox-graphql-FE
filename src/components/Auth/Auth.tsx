/* eslint-disable jsx-a11y/alt-text */
import {useMutation} from '@apollo/client'
import { Session } from "next-auth";
import {Center, Stack, Text, Button, Image, Input} from '@chakra-ui/react'
import { signIn } from "next-auth/react";
import { useState } from "react";
import UserOperations from '../../graphql/operations/user'
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';
import {toast} from 'react-hot-toast'

interface IAuthProps {
    session: Session | null
    reloadSession: () => void
}

const Auth: React.FunctionComponent<IAuthProps> = ({session, reloadSession}) => {
    const [username, setUsername] = useState("")

    const [createUsername, { loading, error}] = useMutation<
    CreateUsernameData, 
    CreateUsernameVariables
    >(UserOperations.Mutations.createUsername)

    const onSubmit = async () => {
        if (!username) return
        try {
            const {data} = await createUsername({variables: {username}})

            if (!data?.createUsername) {
                throw new Error()
            }

            if (data.createUsername.error) {
                const {createUsername: {error}} = data
                throw new Error(error)
            }

            toast.success('Username successfully created!')

            //Reload Session to obtain new username
            reloadSession()
        } catch (error: any) {
            toast.error(error?.message)
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
