import fetch from "node-fetch";
import cheerio from "cheerio";
import { validateRequestPayload } from "../validators/payloadValidator";


export async function getReviews(req, res) {
    const reqPayload = req.body;
    validateRequestPayload(reqPayload);
    const pageLink = reqPayload.link;
    try {
        const responce = await fetch(pageLink);
        const html = await responce.text();
        const cheerioParse = cheerio.load(html);
        res.status(200).send(cheerioParse);
    } catch(error) {
        res.status(500).send(error);
    }
}