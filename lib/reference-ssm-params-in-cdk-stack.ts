import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class ReferenceSsmParamsInCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const importedEmail = ssm.StringParameter.fromStringParameterAttributes(
            this, 'imported-Email', {
            parameterName: 'email',
            version: 1
        });

        const importedPassword = ssm.StringParameter.fromSecureStringParameterAttributes(
            this, 'imported-Password', {
            parameterName: 'db-password',
            version: 1
        });

        const importedEnvs = ssm.StringParameter.fromStringParameterAttributes(
            this, 'imported-Envs', {
            parameterName: 'environments',
            version: 1
        });

        new CfnOutput(this, 'imported-Email-Value', {
            value: importedEmail.stringValue,
        });

        new CfnOutput(this, 'imported-Password-Param', {
            value: importedPassword.parameterName,
        });

        new CfnOutput(this, 'imported-Envs-Value', {
            value: importedEnvs.stringValue,
        });

    }
}
