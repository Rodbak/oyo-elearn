export interface LtiLaunchClaims {
  sub: string;
  email?: string;
  name?: string;
  "https://purl.imsglobal.org/spec/lti/claim/context"?: {
    id: string;
    label?: string;
  };
}

export function getLtiConfig(baseUrl: string) {
  return {
    clientId: process.env.LTI_CLIENT_ID ?? "lti-client-demo",
    deploymentId: process.env.LTI_DEPLOYMENT_ID ?? "deploy-001",
    launchUrl: `${baseUrl}/api/integrations/lti/launch`,
    jwksUrl: `${baseUrl}/api/integrations/lti/jwks`,
  };
}
