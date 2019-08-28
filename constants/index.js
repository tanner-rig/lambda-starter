export const AWS = {
  REGION: process.env.AWS_REGION || 'us-east-1',
  DYNAMO_EXAMPLE_TABLE: process.env.DYNAMO_EXAMPLE_TABLE || 'example-dev',
};

export const USER_STATUS = {
  DELETED: 'DELETED',
  ACTIVE: 'ACTIVE'
}

export const JWT = {
  SECRET: process.env.JWT_SECRET,
};
