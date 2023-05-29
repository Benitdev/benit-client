const addIdHeadingTags = (content: string) => {
  const headingOneBlock = content.match(/<h2.*<h2/g)
  console.log(headingOneBlock)

  const headingOnes = content.match(/<h2.*<.h2>/g)
  const headingOneContents = headingOnes?.map((headingOne) => {
    const headingOneContent = headingOne.match(/<strong>(.*?)<\/strong>/)
    return headingOneContent?.[1]
  })
  const headingTwos = content.match(/<h3.*<.h3>/g)

  //   console.log(headingOneContents)
}

export default addIdHeadingTags