import { HttpException, HttpStatus } from '@nestjs/common';

export class SlugAlreadyInUseException extends HttpException {
    constructor() {
        super('Cabinet slug already in use', HttpStatus.BAD_REQUEST);
    }
}
