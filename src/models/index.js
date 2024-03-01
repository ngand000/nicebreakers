// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Account, Report, Question, Comment, Activity } = initSchema(schema);

export {
  Account,
  Report,
  Question,
  Comment,
  Activity
};