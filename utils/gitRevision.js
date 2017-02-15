import { execSync } from 'child_process';

const gitRevision = execSync('git rev-parse HEAD').toString().trim();

export default gitRevision;
