import {nanoid} from "nanoid"

function generateUsername(){
    const uniqueId = nanoid(8);
    return `@user_${uniqueId}`;
}

export {generateUsername}