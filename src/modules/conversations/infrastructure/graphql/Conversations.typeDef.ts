const typeDefs = `
  type ConversationTime {
    seconds: String
    nanos: Int
  }

  type Word {
    startsAt: ConversationTime
    endsAt: ConversationTime
    value: String
    confidence: Int
  }

  type Paragraph {
    isTheUser: Boolean
    startsAt: ConversationTime
    endsAt: ConversationTime
    value: String
    words: [Word]
  }

  type Transcription {
    paragraphs: [Paragraph]
  }

  type Conversations {
    id: ID
    userId: ID
    filename: String
    transcription: Transcription
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  type Query {
    conversations: [Conversations]
  }
`;

export default typeDefs;
