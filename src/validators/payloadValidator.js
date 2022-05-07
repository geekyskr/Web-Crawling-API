export function validateRequest(reqPayload, req) {
    let maxReviewInOneRequest = 10;
    if(!reqPayload) {
        throw ("payload is missing in request");
    } else if(!reqPayload.link) {
        throw ("link is missing in request payload");
    } else if(req.query.limit && req.query.limit > maxReviewInOneRequest) {
        throw ("limit should not be more than "+ maxReviewInOneRequest);
    }
}
