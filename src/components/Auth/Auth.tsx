/* eslint-disable jsx-a11y/alt-text */
import { Session } from "next-auth";
import {Center, Stack, Text, Button, Image, Input} from '@chakra-ui/react'
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
    session: Session | null
    reloadSession: () => void

}

const Auth: React.FunctionComponent<IAuthProps> = ({session, reloadSession}) => {
    const [username, setUsername] = useState("")

    const onSubmit = async () => {
        try {
            //createUsername mutation to send our username to the GraphQL API
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
