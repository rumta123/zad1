import { Controller, Get, Query, HttpException, InternalServerErrorException, Catch,Post, Body,Put, Patch, Delete} from '@nestjs/common';


@Controller()
export class AppController {

  @Get('/sum')
  getSum(@Query('a') a: string, @Query('b') b: string): number {
    const numA = parseInt(a);
  const numB = parseInt(b);
    if (isNaN(numA) || isNaN(numB)) {
      throw new HttpException('a and b should be numbers', 400);
    }
    return numA + numB;
  }
@Post('/reverse-case')
  reverseCase(@Body() body: { text: string }): string {
    return body.text
      .split('')
      .map((char) =>
        char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase(),
      )
      .join('');
  }
  @Put('/obj-to-array')
  objToArray(@Body() obj: Record<string, any>): Array<{ key: string, value: any }> {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      throw new HttpException('Input should be an object', 400);
    }
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }
  
  @Patch('/reverse-array')
  reverseArray(@Body() body: any): any {
    return body.reverse();
  }
  @Delete('/duplicates')
  deleteDuplicates(@Body() body: any): any[] {
    if (!Array.isArray(body)) {
      throw new HttpException('Invalid input data', 400);
    }
    return [...new Set(body)];
  }
  handleError(error: HttpException) {
    return {
      statusCode: error.getStatus(),
      message: error.message,
    };
  }
}