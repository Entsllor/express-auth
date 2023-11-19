import express from "express";
import {PathWithUserId, privateUserDto, publicUserDto, SignupDto} from "../schemas/users";
import {UserNotFound} from "../exceptions";

import {raise} from 'backend-batteries'
import {Body, Params} from "../helpers/pipes";
import {readUser, signupUser} from "../services/users";
import {prepareResponse} from "../helpers/parsers/prepare-response";

export const router = express.Router({});

router.post('/sign-up', Body(SignupDto), async ({body}, res) => {
    const user = await signupUser(body);
    res.status(201).send(await prepareResponse(privateUserDto, user))
})

router.get('/:id', Params(PathWithUserId), async ({params}, res) => {
    const user = await readUser(params.id) ?? raise(UserNotFound)
    res.status(200).send(await prepareResponse(publicUserDto, user));
})
