import { RefreshTokensService } from '@modules/refresh-tokens/refresh-tokens.service';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Upload } from 'graphql-upload-minimal';
import { JwtPayload } from 'jsonwebtoken';

export type GardentifyContext = {
  authTokens: {
    accessToken: JwtPayload | null;
    refreshToken: JwtPayload | null;
  };
  refreshTokensService: RefreshTokensService;
  usersService: UsersService;
  user: User | null;
};

export const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue(value) {
    if (value instanceof Upload) return value.promise;
    throw new GraphQLError('Upload value invalid.');
  },
  parseLiteral(node) {
    throw new GraphQLError('Upload literal unsupported.', { nodes: node });
  },
  serialize() {
    throw new GraphQLError('Upload serialization unsupported.');
  },
});
