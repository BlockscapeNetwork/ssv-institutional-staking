import { gql } from "@apollo/client/core";

const UPLOAD_FILE = gql(`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`);

export { UPLOAD_FILE };
