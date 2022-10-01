/* eslint-disable import/no-anonymous-default-export */
import {gql} from '@apollo/client'

export default {
    Queries: {},
    Mutations: {
        createUsername : gql `
            mutation CreateUserName($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `
    },
    Subscriptions: {}
}