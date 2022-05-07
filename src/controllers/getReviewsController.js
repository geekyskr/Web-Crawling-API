import fetch from "node-fetch";
import cheerio from "cheerio";
import { validateRequest } from "../validators/payloadValidator.js";

export async function getReviews(req, res) {
    const reqPayload = req.body;
    try {
        validateRequest(reqPayload, req);
    } catch(error) {
        res.status(400).send(error);
    }
    const defaultPageNo = 1;
    const defaultLimit = 5;
    const pageLink = reqPayload.link;
    const page = req.query.page == undefined ? defaultPageNo: req.query.page;
    const limit = req.query.limit == undefined ? defaultLimit: req.query.limit;
    try {
        const responce = await fetch(pageLink);
        const html = await responce.text();
        const $ = cheerio.load(html);
        const customerReviews = getAllReviews($);
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;
        const customerReviewsToSend = customerReviews.slice(startIndex, endIndex);
        res.status(200).send(customerReviewsToSend);
    } catch (error) {
        res.status(500).send(error);
    }
}

function getAllReviews($) {
    let customerReviews = [];
    $("#customerReviews #customerReviews .review").each((i, el) => {
        let reviewObject = {};
        reviewObject["Reviewer"] = $(el).find(".leftCol .reviewer dd:nth-child(2)").text();
        reviewObject["Date"] = $(el).find(".leftCol .reviewer dd:nth-child(4)").text();

        let rating = {};
        let categoryRating = {};
        categoryRating.value = $(el).find(".leftCol .itemReview dd:nth-child(4)").text();
        categoryRating.Features = $(el).find(".leftCol .itemReview dd:nth-child(6)").text();
        categoryRating.Quality = $(el).find(".leftCol .itemReview dd:nth-child(8)").text();
        categoryRating.Performance = $(el).find(".leftCol .itemReview dd:nth-child(10)").text();
        rating["Overall-Rating"] = $(el).find(".leftCol .itemReview dd .itemRating strong").text();;
        rating["Category-Rating"] = categoryRating;
        reviewObject["Rating"] = rating;

        let comment = {};
        comment["Title"] = $(el).find(".rightCol blockquote h6").text();
        comment["Body"] = $(el).find(".rightCol blockquote p").text();
        reviewObject["Comment"] = comment;
        
        customerReviews.push(reviewObject);
    })
    return customerReviews;
}