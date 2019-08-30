import _ from 'lodash';

import * as dynamoDbUtils from '../utils/dynamo';
import * as constants from '../constants';
import { success, serverFailure, failure } from '../utils/response';
import { getUserKeysWithoutSecrets } from '../models/exampleModel';

export async function main(event) {
  return new Promise(async (resolve, reject) => {
    let params;
    console.log('EVENT: ', event)
    const userId = _.get(event, 'pathParameters.userId');

    if (!userId) {
      console.error('Invalid Request: missing required params');
      return reject(failure(400, 'Invalid Request: missing required params'));
    }

    if (userId) {
      params = {
        TableName: constants.AWS.DYNAMO_EXAMPLE_TABLE,
        Key: { userId },
        AttributesToGet: getUserKeysWithoutSecrets()
      };

      // console.info('params: ', params);

      try {
        const result = await dynamoDbUtils.call('get', params);
        const user = result.Item;

        // console.info('result: ', result);

        if (!user) {
          return resolve(success({
            status: 'No user found',
            user: {}
          }));
        }

        return resolve(success({ user }));
      } catch (err) {
        console.error('server error getting the user: ', err);
        return reject(serverFailure('Server error getting the user', err));
      }
    }
  });
}
