type IndustryIdentifier = {
  type: string
  identifier: string
}

type Volume = {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    subtitle: string
    authors: string[] | undefined
    publisher: string
    publishedDate: string
    description: string
    industryIdentifiers: IndustryIdentifier[]
    readingModes: {
      text: boolean
      image: boolean
    }
    pageCount: number
    printType: string
    categories: string[]
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: {
      containsEpubBubbles: boolean
      containsImageBubbles: boolean
    }
    imageLinks?: {
      smallThumbnail: string
      thumbnail: string
    }
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
  }
  saleInfo: {
    country: string
    saleability: string
    isEbook: boolean
  }
  accessInfo: {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    texToSpeechPermission: string
    epub: {
      isAvailable: boolean
    }
    pdf: {
      isAvailable: boolean
      acsTokenLink: string
    }
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
  }
  searchInfo: {
    textSnippet: string
  }
}

export { type Volume }
