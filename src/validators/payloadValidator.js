export function validateRequestPayload(reqPayload) {
    if(!reqPayload) {
        throw ("payload is missing in request");
    } else if(!reqPayload.link) {
        throw ("link is missing in request payload");
    }
}
