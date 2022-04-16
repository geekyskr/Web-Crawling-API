**Problem Statement**
Create an API to crawl reviews from website Tigerdirect. API should take any review page link
as input & give Json as output.

**Input**
Any http://www.tigerdirect.com/ review page link. Eg :
https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3839

**Output**
Response should contain :
List of Reviews where each review is identified by :
- Review Comment
- Rating
- Review Date
- Reviewer Name

**Implementation Technologies**
- NodeJs
- Node Js lib cheerio for crawling data from a website.