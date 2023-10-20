import { prisma } from '../utility/connections';

abstract class BaseController {
  protected db = prisma.instance;

  constructor () {}
}

export { BaseController };
