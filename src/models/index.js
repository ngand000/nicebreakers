// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, Question, Comment, Activity } = initSchema(schema);

export {
  Report,
  Question,
  Comment,
  Activity
};