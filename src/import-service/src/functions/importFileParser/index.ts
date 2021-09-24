import { handlerPath } from '@libs/handlerResolver';
import {BUCKET, UPLOAD_DIR} from '@config/settings';

// console.log(env)
console.log(BUCKET)

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: `${UPLOAD_DIR}/`,
          },
        ],
      },
    },
  ],
};
