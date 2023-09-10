import { ObjectId } from "mongodb";
import "reflect-metadata";
const mongoIdMetadataKey = Symbol("MongoIdPipe");

export function MongoIdPipe(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingMongoIdParameters: number[] =
    Reflect.getOwnMetadata(mongoIdMetadataKey, target, propertyKey) || [];

  existingMongoIdParameters.push(parameterIndex);

  Reflect.defineMetadata(
    mongoIdMetadataKey,
    existingMongoIdParameters,
    target,
    propertyKey
  );
}

export function ValidateMongoId(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value!;
  descriptor.value = function () {
    let mongoIdParameters: number[] = Reflect.getOwnMetadata(
      mongoIdMetadataKey,
      target,
      propertyName
    );

    if (mongoIdParameters) {
      for (let parameterIndex of mongoIdParameters) {
        const parameterValue = arguments[parameterIndex];
        if (!parameterValue) {
          throw new Error(`Query parameter is required`);
        }
        if (!ObjectId.isValid(parameterValue)) {
          throw new Error(
            `${parameterValue} is not a valid mongo id.`
          );
        }
      }
    }

    return method.apply(this, arguments);
  };
}
