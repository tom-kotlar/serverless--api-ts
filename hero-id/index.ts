import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { heroService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    context.req.body = context.bindings.getHerosById
    await heroService.getHero(context);
};

export default httpTrigger;