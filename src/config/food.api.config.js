

const paths = [
  {
    path: "/foods",
    get: {
      description: "food search",
      queryParams: [
        { name: "query", required: true, type: String },
        { name: "start", required: false, type: Number, default: 0 },
        { name: "count", required: false, type: Number, default: 25 },
        { name: "spell", required: false, type: Number, default: true },
      ],
      headers: [],
      responses: [{ statusCode: 200, description: null }],
    },
  },
  {
    path: "/units",
    get: {
      description: "returns json document containing all units",
      queryParams: [],
      headers: [
        { name: "Accept", required: false, default: "application/json" },
      ],
      responses: [{ statusCode: 200, description: null }],
    },
  },
  {
    paths: "/nutrients",
    get: {
      description: "returns a json document containing all known nutrients",
    },
    queryParams: [],
    headers: [],
  },
];
