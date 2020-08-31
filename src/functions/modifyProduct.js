const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')
const blocksToHtml = require('@sanity/block-content-to-html')
require('dotenv').config({path:__dirname+'/./../.env'})

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

exports.handler = (event, context, callback) => {

    const productId = event.queryStringParameters.id

    sanity.patch(productId) // Document ID to patch
    .set({title: 'CHANGED TITLE'}) // Shallow merge
    .commit()
    .then(results => {
        console.log(results.title)
        const output = {
            id: results._id,
            name: results.title,
            url: `${process.env.URL}/.netlify/functions/modifyProduct`,
            price: results.defaultProductVariant.price,
            description: results.blurb.en,
            body: blocksToHtml({blocks: results.body.en}),
          }

        const image = results.defaultProductVariant.images && results.defaultProductVariant.images.length > 0
            ? results.defaultProductVariant.images[0].asset._ref
            : null
  
        if (image) {
            output.image = imageUrlBuilder(sanity).image(image).size(300, 300).fit('fillmax').url()
        }

        const products = [
            output
        ]

        callback(null, {
                    statusCode: 200,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(products),
                })
    })
    .catch(err => {
        console.error('Oh no, the update failed: ', err.message)
      })
    
}