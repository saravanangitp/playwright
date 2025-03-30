import test from "@playwright/test";
import { createOpportunity, deleteOpportunity, generateToken, getOpportunityById, updateOpportunity } from "./apiUtils";


test('Salesforce - Opportunity E2E with the help of Utils', async({request}) => {
    const tokenReturn = await generateToken(request);
    const opportunityId = await createOpportunity(request);
    await getOpportunityById(request, opportunityId)
    await updateOpportunity(request, opportunityId);
    await deleteOpportunity(request, opportunityId);
})