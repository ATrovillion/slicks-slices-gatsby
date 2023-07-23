var plugins = [{
      plugin: require('/Users/aarontrovillion/Coding/slick-slices/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aarontrovillion/Coding/slick-slices/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aarontrovillion/Coding/slick-slices/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"5pfs7p1a","dataset":"production","watchMode":true,"token":"skCR0MHtC1eJp8SaXEJbMr1JD11oJWRTRxQK5KgFOc2QG3UOXmaxkrts8c0J8c11R65f6dIYTWdz82cXRLrgp130qDcGmA31km2yN5UTjuA1F9US9eYzvuXTrqZqlE283IoAaP4J7eqIRuuNNNcTpQDvMp8KdbnTZf9PrcCpA0uonCqlZMxf"},
    },{
      plugin: require('/Users/aarontrovillion/Coding/slick-slices/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
