const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html');
require('dotenv').config({path:__dirname+'/./../.env'});

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

exports.handler = (event, context, callback) => {
  const start = event.queryStringParameters.start
  const end = event.queryStringParameters.end


  let query = '*[_type=="product"]';
  if(start !== 'undefined' && end !== 'undefined'){
    query = query + `[${start}...${end}]`
  }
  query = query + ' | order(title asc)'

  sanity.fetch(query).then(results => {
    const products = results.map(x => {
      const output = {
        id: x._id,
        name: x.title,
        url: `${process.env.URL}/.netlify/functions/getProduct?id=${x._id}`,
        price: x.defaultProductVariant.price,
        description: x.blurb.en,
        body: blocksToHtml({blocks: x.body.en}),
        vendor: x.vendor._ref
      }

      const image = x.defaultProductVariant.images && x.defaultProductVariant.images.length > 0
        ? x.defaultProductVariant.images[0].asset._ref
        : null;

      if (image) {
        output.image = imageUrlBuilder(sanity).image(image).size(300, 300).fit('fillmax').url();
      }

      return output;
    });

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
  });
}