import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { isValidCNPJ, isValidCPF, isE164Phone } from '../utils/validation';

export function IsCPF(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          return isValidCPF(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Invalid CPF';
        },
      },
    });
  };
}

export function IsCNPJ(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          return isValidCNPJ(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Invalid CNPJ';
        },
      },
    });
  };
}

export function IsE164Phone(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isE164Phone',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          return isE164Phone(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Phone must be in E.164 format (+5511999998888)';
        },
      },
    });
  };
}
